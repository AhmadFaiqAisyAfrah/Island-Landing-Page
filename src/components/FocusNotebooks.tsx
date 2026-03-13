"use client";

import { useState, useCallback, useRef, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import { ArrowLeft, Plus, Check, CalendarDays, MoreHorizontal } from "lucide-react";
import { onAuthStateChanged, User } from "firebase/auth";
import { addDoc, collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { db, getClientAuth } from "@/lib/firebase";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

type Task = {
    id: string;
    name: string;
    date: string;
    tag: string;
    emoji: string;
    estimatedMinutes: number | null;
    remainingMinutes: number | null;
    completed: boolean;
};

type TagOption = {
    id: string;
    label: string;
    emoji: string;
};

type Notebook = {
    id: string;
    emoji: string;
    name: string;
    createdLabel: string;
    tasks: Task[];
};

const DEFAULT_NOTEBOOKS: Notebook[] = [];

const DEFAULT_TAG_OPTIONS: TagOption[] = [
    { id: "none", label: "None", emoji: "" },
    { id: "study", label: "Study", emoji: "📘" },
    { id: "work", label: "Work", emoji: "💼" },
    { id: "reading", label: "Reading", emoji: "📖" },
    { id: "writing", label: "Writing", emoji: "✍️" },
    { id: "mindfulness", label: "Mindfulness", emoji: "🌿" },
];

const NOTEBOOK_EMOJI_OPTIONS = [
    { emoji: "📚", label: "Study" },
    { emoji: "🧠", label: "Thinking" },
    { emoji: "🧪", label: "Science" },
    { emoji: "💻", label: "Coding" },
    { emoji: "📖", label: "Reading" },
    { emoji: "✍️", label: "Writing" },
    { emoji: "🎯", label: "Focus" },
    { emoji: "🏋️", label: "Fitness" },
    { emoji: "🌱", label: "Growth" },
    { emoji: "🎨", label: "Creative" },
    { emoji: "📊", label: "Work" },
    { emoji: "🚀", label: "Projects" },
];

const NOTEBOOK_EMOJI_POOL = NOTEBOOK_EMOJI_OPTIONS.map((option) => option.emoji);
const NOTEBOOKS_COLLECTION = "notebooks";

/* ─────────────── Notebook Room (To-Do view) ─────────────── */

function NotebookRoom({
    notebook,
    onBack,
    onUpdateTasks,
}: {
    notebook: Notebook;
    onBack: () => void;
    onUpdateTasks: (notebookId: string, tasks: Task[]) => void;
}) {
    const [tagFilter, setTagFilter] = useState("all");
    const [dateFilterStart, setDateFilterStart] = useState("");
    const [dateFilterEnd, setDateFilterEnd] = useState("");
    const [isDateRangeEnabled, setIsDateRangeEnabled] = useState(false);
    const [isDateFilterPickerOpen, setIsDateFilterPickerOpen] = useState(false);
    const [statusFilter, setStatusFilter] = useState("all");
    const [isAddTaskFormOpen, setIsAddTaskFormOpen] = useState(false);
    const [newTaskName, setNewTaskName] = useState("");
    const [newTaskDate, setNewTaskDate] = useState("");
    const [newTaskEstimatedMinutes, setNewTaskEstimatedMinutes] = useState("");
    const [tagOptions, setTagOptions] = useState<TagOption[]>(DEFAULT_TAG_OPTIONS);
    const [selectedTagId, setSelectedTagId] = useState("none");
    const [showCustomTagForm, setShowCustomTagForm] = useState(false);
    const [customTagName, setCustomTagName] = useState("");
    const [customTagEmoji, setCustomTagEmoji] = useState("");
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const [openTaskMenuId, setOpenTaskMenuId] = useState<string | null>(null);
    const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
    const [editTaskName, setEditTaskName] = useState("");
    const [editTaskDate, setEditTaskDate] = useState("");
    const [editTaskEstimatedMinutes, setEditTaskEstimatedMinutes] = useState("");
    const [editSelectedTagId, setEditSelectedTagId] = useState("none");
    const dateInputRef = useRef<HTMLInputElement | null>(null);
    const editDateInputRef = useRef<HTMLInputElement | null>(null);
    const dateFilterStartInputRef = useRef<HTMLInputElement | null>(null);
    const dateFilterEndInputRef = useRef<HTMLInputElement | null>(null);
    const dateFilterPickerRef = useRef<HTMLDivElement | null>(null);

    const formatDateLabel = (dateValue: string) => {
        if (!dateValue) return "";
        const date = new Date(dateValue);
        if (Number.isNaN(date.getTime())) return "";
        return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(date);
    };

    const formatDateWithYearLabel = (dateValue: string) => {
        const parsedDate = parseDateValue(dateValue);
        if (!parsedDate) return "";
        return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short", year: "numeric" }).format(parsedDate);
    };

    const openNativeDatePicker = (input: HTMLInputElement | null) => {
        if (!input) return;
        input.focus();
        try {
            input.showPicker?.();
        } catch {
            // Browser may block showPicker; focus keeps native behavior.
        }
    };

    const toDateInputValue = (date: Date) => {
        const yyyy = date.getFullYear();
        const mm = String(date.getMonth() + 1).padStart(2, "0");
        const dd = String(date.getDate()).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
    };

    const parseDateValue = (dateValue: string) => {
        if (!dateValue) return null;
        const [yearString, monthString, dayString] = dateValue.split("-");
        const year = Number.parseInt(yearString, 10);
        const month = Number.parseInt(monthString, 10);
        const day = Number.parseInt(dayString, 10);
        if (Number.isNaN(year) || Number.isNaN(month) || Number.isNaN(day)) return null;

        const date = new Date(year, month - 1, day);
        if (Number.isNaN(date.getTime())) return null;
        return date;
    };

    const filterTagOptions = useMemo(() => {
        const tagSet = new Set<string>();
        notebook.tasks.forEach((task) => {
            const trimmedTag = task.tag.trim();
            if (trimmedTag) {
                tagSet.add(trimmedTag);
            }
        });
        return Array.from(tagSet).sort((firstTag, secondTag) => firstTag.localeCompare(secondTag));
    }, [notebook.tasks]);

    const activeDateFilterRange = useMemo(() => {
        const startDate = parseDateValue(dateFilterStart);
        if (!startDate) return null;

        if (!isDateRangeEnabled) {
            return {
                start: startDate,
                end: startDate,
            };
        }

        const endDate = parseDateValue(dateFilterEnd);
        if (!endDate) {
            return {
                start: startDate,
                end: startDate,
            };
        }

        return {
            start: startDate <= endDate ? startDate : endDate,
            end: startDate <= endDate ? endDate : startDate,
        };
    }, [dateFilterStart, dateFilterEnd, isDateRangeEnabled]);

    const dateFilterDisplayLabel = !dateFilterStart
        ? "Select Date"
        : isDateRangeEnabled && dateFilterEnd
            ? `${formatDateWithYearLabel(dateFilterStart)} → ${formatDateWithYearLabel(dateFilterEnd)}`
            : formatDateWithYearLabel(dateFilterStart);

    const filteredTasks = useMemo(() => {
        return notebook.tasks.filter((task) => {
            if (tagFilter !== "all" && task.tag !== tagFilter) {
                return false;
            }

            if (activeDateFilterRange) {
                const taskDate = parseDateValue(task.date);
                if (!taskDate) return false;

                if (taskDate < activeDateFilterRange.start || taskDate > activeDateFilterRange.end) {
                    return false;
                }
            }

            const isCompleted = task.completed || task.remainingMinutes === 0;
            if (statusFilter === "completed" && !isCompleted) {
                return false;
            }

            if (statusFilter === "incomplete" && isCompleted) {
                return false;
            }

            return true;
        });
    }, [
        notebook.tasks,
        tagFilter,
        activeDateFilterRange,
        statusFilter,
    ]);

    const applyDateQuickRange = (days: number) => {
        const endDate = new Date();
        endDate.setHours(0, 0, 0, 0);
        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - days);

        setIsDateRangeEnabled(true);
        setDateFilterStart(toDateInputValue(startDate));
        setDateFilterEnd(toDateInputValue(endDate));
    };

    useEffect(() => {
        if (tagFilter !== "all" && !filterTagOptions.includes(tagFilter)) {
            setTagFilter("all");
        }
    }, [tagFilter, filterTagOptions]);

    useEffect(() => {
        if (!isDateFilterPickerOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            if (!dateFilterPickerRef.current?.contains(target || null)) {
                setIsDateFilterPickerOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isDateFilterPickerOpen]);

    const resetAddTaskForm = () => {
        setNewTaskName("");
        setNewTaskDate("");
        setNewTaskEstimatedMinutes("");
        setSelectedTagId("none");
        setShowCustomTagForm(false);
        setCustomTagName("");
        setCustomTagEmoji("");
        setIsEmojiPickerOpen(false);
    };

    const closeAddTaskModal = () => {
        resetAddTaskForm();
        setIsAddTaskFormOpen(false);
    };

    const resolveTagSelection = (
        selectedId: string,
        fallback?: { tag: string; emoji: string }
    ) => {
        if (selectedId === "none") {
            return { tag: "", emoji: "" };
        }

        const selectedTag = tagOptions.find((tag) => tag.id === selectedId);
        if (selectedTag) {
            return {
                tag: selectedTag.label,
                emoji: selectedTag.emoji,
            };
        }

        return {
            tag: fallback?.tag ?? "",
            emoji: fallback?.emoji ?? "",
        };
    };

    const addTask = () => {
        const trimmed = newTaskName.trim();
        if (!trimmed) return;

        const selectedTagValue = resolveTagSelection(selectedTagId);
        const parsedMinutes = Number.parseInt(newTaskEstimatedMinutes, 10);
        const estimatedMinutes = Number.isNaN(parsedMinutes) || parsedMinutes <= 0 ? null : parsedMinutes;

        const task: Task = {
            id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            name: trimmed,
            date: newTaskDate,
            tag: selectedTagValue.tag,
            emoji: selectedTagValue.emoji,
            estimatedMinutes,
            remainingMinutes: estimatedMinutes,
            completed: false,
        };

        onUpdateTasks(notebook.id, [...notebook.tasks, task]);
        resetAddTaskForm();
        setIsAddTaskFormOpen(false);
    };

    const addCustomTag = () => {
        const name = customTagName.trim();
        if (!name) return;

        const emoji = customTagEmoji.trim() || "🏷";
        const customTag: TagOption = {
            id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
            label: name,
            emoji,
        };

        setTagOptions((prev) => [...prev, customTag]);
        setSelectedTagId(customTag.id);
        setCustomTagName("");
        setCustomTagEmoji("");
        setIsEmojiPickerOpen(false);
        setShowCustomTagForm(false);
    };

    const toggleTask = (taskId: string) => {
        const updated = notebook.tasks.map((t) =>
            t.id === taskId ? { ...t, completed: !t.completed } : t
        );
        onUpdateTasks(notebook.id, updated);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTask();
        }
    };

    const openEditTask = (task: Task) => {
        const matchedTag =
            tagOptions.find((tag) => tag.label === task.tag && tag.emoji === task.emoji) ??
            tagOptions.find((tag) => tag.label === task.tag) ??
            null;

        if (!matchedTag && task.tag.trim()) {
            const generatedId = `from-task-${task.tag.toLowerCase().replace(/\s+/g, "-")}`;
            setTagOptions((prev) => {
                if (prev.some((tag) => tag.id === generatedId || tag.label === task.tag)) {
                    return prev;
                }

                return [
                    ...prev,
                    {
                        id: generatedId,
                        label: task.tag,
                        emoji: task.emoji || "🏷",
                    },
                ];
            });
            setEditSelectedTagId(generatedId);
        } else {
            setEditSelectedTagId(matchedTag?.id ?? "none");
        }

        setEditTaskName(task.name);
        setEditTaskDate(task.date);
        setEditTaskEstimatedMinutes(task.estimatedMinutes !== null ? String(task.estimatedMinutes) : "");
        setEditingTaskId(task.id);
    };

    const closeEditModal = () => {
        setEditingTaskId(null);
        setEditTaskName("");
        setEditTaskDate("");
        setEditTaskEstimatedMinutes("");
        setEditSelectedTagId("none");
    };

    const saveEditedTask = () => {
        if (!editingTaskId) return;

        const trimmed = editTaskName.trim();
        if (!trimmed) return;

        const selectedTagValue = resolveTagSelection(editSelectedTagId, {
            tag: notebook.tasks.find((task) => task.id === editingTaskId)?.tag ?? "",
            emoji: notebook.tasks.find((task) => task.id === editingTaskId)?.emoji ?? "",
        });
        const parsedMinutes = Number.parseInt(editTaskEstimatedMinutes, 10);
        const nextEstimatedMinutes = Number.isNaN(parsedMinutes) || parsedMinutes <= 0 ? null : parsedMinutes;

        const updatedTasks = notebook.tasks.map((task) => {
            if (task.id !== editingTaskId) return task;

            let nextRemainingMinutes = task.remainingMinutes;
            if (nextEstimatedMinutes === null) {
                nextRemainingMinutes = null;
            } else if (task.completed) {
                nextRemainingMinutes = 0;
            } else if (task.estimatedMinutes !== null && task.remainingMinutes !== null) {
                const usedMinutes = Math.max(0, task.estimatedMinutes - task.remainingMinutes);
                nextRemainingMinutes = Math.max(0, nextEstimatedMinutes - usedMinutes);
            } else {
                nextRemainingMinutes = nextEstimatedMinutes;
            }

            return {
                ...task,
                name: trimmed,
                date: editTaskDate,
                tag: selectedTagValue.tag,
                emoji: selectedTagValue.emoji,
                estimatedMinutes: nextEstimatedMinutes,
                remainingMinutes: nextRemainingMinutes,
                completed: task.completed || (nextRemainingMinutes !== null && nextRemainingMinutes <= 0),
            };
        });

        onUpdateTasks(notebook.id, updatedTasks);
        closeEditModal();
    };

    const deleteTask = (taskId: string) => {
        const updatedTasks = notebook.tasks.filter((task) => task.id !== taskId);
        onUpdateTasks(notebook.id, updatedTasks);
        setOpenTaskMenuId(null);
    };

    useEffect(() => {
        if (!openTaskMenuId) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            if (!target?.closest("[data-task-menu-root='true']")) {
                setOpenTaskMenuId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openTaskMenuId]);

    return (
        <section className="max-w-[1200px] mx-auto px-6 pb-12">
            <div className="rounded-[32px] border border-[var(--border-color)] bg-[color:color-mix(in_srgb,var(--card-bg)_88%,transparent)] p-6 md:p-8 shadow-[0_18px_40px_rgba(8,15,26,0.12)] backdrop-blur-sm">
                {/* Back button */}
                <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex items-center gap-2 text-sm text-[var(--paragraph-text)] hover:text-[var(--accent-green)] transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Notebooks
                </button>

                <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[var(--text-secondary)]">
                    Focus Notebook Room
                </p>

                {/* Title */}
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)]">
                    <span aria-hidden="true" className="mr-2">{notebook.emoji || "📒"}</span>
                    {notebook.name}
                </h2>

                <div className="mt-6 border-t border-[var(--border-color)]" />

                <div className="mt-6 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
                    <p className="text-xs font-semibold tracking-wide uppercase text-[var(--text-secondary)]">Filter</p>
                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
                        <label className="space-y-1.5">
                            <span className="text-xs font-semibold tracking-wide uppercase text-[var(--text-secondary)]">Tag</span>
                            <select
                                value={tagFilter}
                                onChange={(event) => setTagFilter(event.target.value)}
                                className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] px-3 py-2 text-sm text-[var(--heading-text)] outline-none transition-colors focus:border-[var(--accent-green)]"
                            >
                                <option value="all">All</option>
                                {filterTagOptions.map((tagLabel) => (
                                    <option key={tagLabel} value={tagLabel}>{tagLabel}</option>
                                ))}
                            </select>
                        </label>

                        <label className="space-y-1.5">
                            <span className="text-xs font-semibold tracking-wide uppercase text-[var(--text-secondary)]">Date</span>
                            <div ref={dateFilterPickerRef} className="relative">
                                <button
                                    type="button"
                                    onClick={() => setIsDateFilterPickerOpen((prev) => !prev)}
                                    className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] px-3 py-2 text-left text-sm text-[var(--heading-text)] outline-none transition-colors hover:border-[var(--accent-green)]"
                                >
                                    {dateFilterDisplayLabel}
                                </button>

                                {isDateFilterPickerOpen && (
                                    <div className="absolute left-0 top-11 z-30 w-[min(92vw,360px)] rounded-2xl border border-[var(--border-color)] bg-[var(--card-bg)] p-4 shadow-[0_18px_34px_rgba(8,15,26,0.24)]">
                                        <label className="space-y-1.5 block">
                                            <span className="text-xs font-semibold tracking-wide uppercase text-[var(--text-secondary)]">Select Date</span>
                                            <div
                                                className="relative cursor-pointer"
                                                onClick={() => openNativeDatePicker(dateFilterStartInputRef.current)}
                                            >
                                                <input
                                                    ref={dateFilterStartInputRef}
                                                    type="date"
                                                    value={dateFilterStart}
                                                    onChange={(event) => setDateFilterStart(event.target.value)}
                                                    className="island-date-input w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 py-2 pr-10 text-sm text-[var(--heading-text)] outline-none transition-colors focus:border-[var(--accent-green)]"
                                                />
                                                <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" />
                                            </div>
                                        </label>

                                        <div className="mt-3 flex items-center justify-between rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 py-2">
                                            <span className="text-xs font-semibold tracking-wide uppercase text-[var(--text-secondary)]">End Date</span>
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setIsDateRangeEnabled((prev) => {
                                                        const next = !prev;
                                                        if (!next) {
                                                            setDateFilterEnd("");
                                                        } else if (!dateFilterEnd && dateFilterStart) {
                                                            setDateFilterEnd(dateFilterStart);
                                                        }
                                                        return next;
                                                    });
                                                }}
                                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isDateRangeEnabled ? "bg-[var(--accent-green)]" : "bg-[var(--border-color)]"}`}
                                                aria-pressed={isDateRangeEnabled}
                                            >
                                                <span
                                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isDateRangeEnabled ? "translate-x-6" : "translate-x-1"}`}
                                                />
                                            </button>
                                        </div>

                                        {isDateRangeEnabled && (
                                            <label className="mt-3 space-y-1.5 block">
                                                <span className="text-xs font-semibold tracking-wide uppercase text-[var(--text-secondary)]">End Date</span>
                                                <div
                                                    className="relative cursor-pointer"
                                                    onClick={() => openNativeDatePicker(dateFilterEndInputRef.current)}
                                                >
                                                    <input
                                                        ref={dateFilterEndInputRef}
                                                        type="date"
                                                        value={dateFilterEnd}
                                                        onChange={(event) => setDateFilterEnd(event.target.value)}
                                                        className="island-date-input w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 py-2 pr-10 text-sm text-[var(--heading-text)] outline-none transition-colors focus:border-[var(--accent-green)]"
                                                    />
                                                    <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" />
                                                </div>
                                            </label>
                                        )}

                                        <div className="mt-3">
                                            <p className="text-xs font-semibold tracking-wide uppercase text-[var(--text-secondary)]">Quick ranges</p>
                                            <div className="mt-2 flex flex-wrap gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => applyDateQuickRange(7)}
                                                    className="rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs text-[var(--heading-text)] hover:border-[var(--accent-green)] transition-colors"
                                                >
                                                    Last week
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => applyDateQuickRange(30)}
                                                    className="rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs text-[var(--heading-text)] hover:border-[var(--accent-green)] transition-colors"
                                                >
                                                    Last month
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => applyDateQuickRange(90)}
                                                    className="rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs text-[var(--heading-text)] hover:border-[var(--accent-green)] transition-colors"
                                                >
                                                    Last 3 months
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => applyDateQuickRange(180)}
                                                    className="rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs text-[var(--heading-text)] hover:border-[var(--accent-green)] transition-colors"
                                                >
                                                    Last 6 months
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => applyDateQuickRange(365)}
                                                    className="rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs text-[var(--heading-text)] hover:border-[var(--accent-green)] transition-colors"
                                                >
                                                    Last year
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center justify-start">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setDateFilterStart("");
                                                    setDateFilterEnd("");
                                                    setIsDateRangeEnabled(false);
                                                }}
                                                className="text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--heading-text)] transition-colors"
                                            >
                                                Clear date filter
                                            </button>
                                        </div>

                                        <p className="mt-3 text-xs text-[var(--text-secondary)] opacity-80">
                                            Date selection is automatically saved. Click outside to close.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </label>

                        <label className="space-y-1.5">
                            <span className="text-xs font-semibold tracking-wide uppercase text-[var(--text-secondary)]">Status</span>
                            <select
                                value={statusFilter}
                                onChange={(event) => setStatusFilter(event.target.value)}
                                className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] px-3 py-2 text-sm text-[var(--heading-text)] outline-none transition-colors focus:border-[var(--accent-green)]"
                            >
                                <option value="all">All</option>
                                <option value="completed">Completed</option>
                                <option value="incomplete">Incomplete</option>
                            </select>
                        </label>
                    </div>

                </div>

                <button
                    type="button"
                    onClick={() => setIsAddTaskFormOpen(true)}
                    className="mt-4 text-base font-semibold text-[var(--heading-text)] hover:text-[var(--accent-green)] transition-colors"
                >
                    + Add Task
                </button>

                {/* Divider */}
                <div className="mt-6 border-t border-[var(--border-color)]" />

                <p className="mt-6 text-base font-semibold text-[var(--heading-text)]">Task List</p>

                {/* Task list */}
                <div className="mt-6 space-y-2">
                    {notebook.tasks.length === 0 && (
                        <p className="text-sm text-[var(--text-secondary)] py-8 text-center">
                            No tasks yet — add one above to get started.
                        </p>
                    )}

                    {notebook.tasks.length > 0 && filteredTasks.length === 0 && (
                        <p className="text-sm text-[var(--text-secondary)] py-8 text-center">
                            No tasks match the selected filters.
                        </p>
                    )}

                    {filteredTasks.map((task) => {
                        const remainingMinutes = task.remainingMinutes ?? task.estimatedMinutes;
                        const safeRemainingMinutes = remainingMinutes !== null ? Math.max(0, remainingMinutes) : null;
                        const isCompleted = task.completed || safeRemainingMinutes === 0;
                        const progressPercent =
                            task.estimatedMinutes !== null && safeRemainingMinutes !== null && task.estimatedMinutes > 0
                                ? Math.min(
                                    100,
                                    Math.max(
                                        0,
                                        Math.round(((task.estimatedMinutes - safeRemainingMinutes) / task.estimatedMinutes) * 100)
                                    )
                                )
                                : isCompleted
                                    ? 100
                                    : 0;

                        const progressStatusText = isCompleted
                            ? "Completed"
                            : safeRemainingMinutes !== null
                                ? `${safeRemainingMinutes}m left`
                                : "No estimate";

                        return (
                            <div
                                key={task.id}
                                className={`w-full rounded-xl px-4 py-3 text-left transition-all duration-200 hover:bg-[var(--bg-secondary)] ${isCompleted ? "opacity-80" : ""
                                    }`}
                            >
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex items-start gap-3 min-w-0">
                                        {/* Checkbox */}
                                        <button
                                            type="button"
                                            onClick={() => toggleTask(task.id)}
                                            className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors duration-200 ${isCompleted
                                                ? "bg-[var(--accent-green)] border-[var(--accent-green)]"
                                                : "border-[var(--border-color)]"
                                                }`}
                                        >
                                            {isCompleted && <Check className="w-3.5 h-3.5 text-white" />}
                                        </button>

                                        {/* Text */}
                                        <button
                                            type="button"
                                            onClick={() => toggleTask(task.id)}
                                            className={`text-base text-[var(--heading-text)] transition-all duration-200 break-words ${isCompleted ? "line-through" : ""
                                                }`}
                                        >
                                            {task.name}
                                        </button>
                                    </div>

                                    <div className="flex items-start justify-end gap-2 max-w-[60%]">
                                        <div className="flex flex-wrap items-center justify-end gap-2">
                                            {task.tag && (
                                                <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border-color)] bg-[color:color-mix(in_srgb,var(--bg-secondary)_68%,white)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)]">
                                                    <span aria-hidden="true">{task.emoji || "🏷"}</span>
                                                    {task.tag}
                                                </span>
                                            )}
                                            {task.date && (
                                                <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border-color)] bg-[color:color-mix(in_srgb,var(--bg-secondary)_68%,white)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)]">
                                                    <span aria-hidden="true">📅</span>
                                                    {formatDateLabel(task.date)}
                                                </span>
                                            )}
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    window.dispatchEvent(new CustomEvent("focus-task-selected", {
                                                        detail: {
                                                            notebookId: notebook.id,
                                                            taskId: task.id,
                                                            name: task.name,
                                                            tag: task.tag,
                                                            emoji: task.emoji,
                                                        },
                                                    }));

                                                    const pomodoroSection = document.getElementById("pomodoro-focus-section");
                                                    pomodoroSection?.scrollIntoView({ behavior: "smooth", block: "start" });
                                                }}
                                                className="inline-flex items-center rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 py-1.5 text-xs font-semibold text-[var(--heading-text)] transition-colors hover:border-[var(--accent-green)]"
                                            >
                                                Begin Focus
                                            </button>
                                        </div>

                                        <div className="relative" data-task-menu-root="true">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    setOpenTaskMenuId((prev) => (prev === task.id ? null : task.id));
                                                }}
                                                className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--heading-text)] hover:border-[var(--accent-green)]"
                                                aria-label={`Open task menu for ${task.name}`}
                                            >
                                                ⋯
                                            </button>
                                            {openTaskMenuId === task.id && (
                                                <div className="absolute right-0 top-9 z-20 min-w-[140px] rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-1.5 shadow-[0_14px_28px_rgba(8,15,26,0.2)]">
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setOpenTaskMenuId(null);
                                                            openEditTask(task);
                                                        }}
                                                        className="w-full rounded-lg px-3 py-2 text-left text-sm text-[var(--heading-text)] transition-colors hover:bg-[var(--bg-secondary)]"
                                                    >
                                                        Edit Task
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={() => deleteTask(task.id)}
                                                        className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-500 transition-colors hover:bg-red-50"
                                                    >
                                                        Delete Task
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-3 pl-8">
                                    <div className="flex items-center gap-3">
                                        <div className="h-2 w-full overflow-hidden rounded-full bg-[color:color-mix(in_srgb,var(--bg-secondary)_72%,white)]">
                                            <div
                                                className="h-full rounded-full bg-[var(--accent-green)] transition-all duration-300"
                                                style={{ width: `${progressPercent}%` }}
                                            />
                                        </div>
                                        <span className="text-xs font-semibold text-[var(--text-secondary)] min-w-[42px] text-right">
                                            {progressPercent}%
                                        </span>
                                        <span className="text-xs font-medium text-[var(--text-secondary)] min-w-[82px] text-right">
                                            {progressStatusText}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {isAddTaskFormOpen && (
                    <div className="fixed inset-0 z-50 bg-[#0F172A]/45 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
                        <div className="w-full max-w-2xl rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-[0_24px_44px_rgba(8,15,26,0.24)] animate-modal-pop">
                            <h3 className="text-xl font-bold text-[var(--heading-text)]">Add Task</h3>
                            <p className="mt-2 text-sm text-[var(--paragraph-text)]">Create a new task.</p>

                            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label className="space-y-2 md:col-span-2">
                                    <span className="text-xs font-semibold tracking-wide uppercase text-[var(--text-secondary)]">Task Name</span>
                                    <input
                                        type="text"
                                        value={newTaskName}
                                        onChange={(e) => setNewTaskName(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Add a new task..."
                                        className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--heading-text)] outline-none transition-colors placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-green)]"
                                    />
                                </label>

                                <label className="space-y-2">
                                    <span className="text-xs font-semibold tracking-wide uppercase text-[var(--text-secondary)]">Date</span>
                                    <div
                                        className="relative cursor-pointer"
                                        onClick={() => openNativeDatePicker(dateInputRef.current)}
                                    >
                                        <input
                                            ref={dateInputRef}
                                            type="date"
                                            value={newTaskDate}
                                            onChange={(e) => setNewTaskDate(e.target.value)}
                                            className="island-date-input w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 pr-10 text-[var(--heading-text)] outline-none transition-colors focus:border-[var(--accent-green)]"
                                        />
                                        <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" />
                                    </div>
                                </label>

                                <div className="space-y-2">
                                    <span className="text-xs font-semibold tracking-wide uppercase text-[var(--text-secondary)]">Tag</span>
                                    <div className="flex flex-wrap gap-2">
                                        {tagOptions.map((tag) => {
                                            const isActive = selectedTagId === tag.id;
                                            return (
                                            <button
                                                key={tag.id}
                                                type="button"
                                                onClick={() => setSelectedTagId(tag.id)}
                                                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-150 ${isActive
                                                    ? "border border-[rgba(34,197,94,0.5)] bg-[rgba(34,197,94,0.15)] text-[var(--heading-text)] shadow-[0_0_6px_rgba(34,197,94,0.25)]"
                                                    : "border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-secondary)] opacity-90 hover:text-[var(--heading-text)] hover:border-[var(--accent-green)] hover:bg-[rgba(34,197,94,0.1)]"
                                                    }`}
                                            >
                                                {isActive && <span aria-hidden="true">✓</span>}
                                                {tag.emoji && <span aria-hidden="true">{tag.emoji}</span>}
                                                {tag.label}
                                            </button>
                                            );
                                        })}
                                        <button
                                            type="button"
                                            onClick={() => setShowCustomTagForm((prev) => !prev)}
                                            className="inline-flex items-center gap-1.5 rounded-full border border-dashed border-[var(--accent-green)]/70 bg-[var(--bg-primary)] px-3 py-1.5 text-xs font-medium text-[var(--accent-green)] transition-colors hover:bg-[color:color-mix(in_srgb,var(--accent-green)_10%,white)]"
                                        >
                                            + Custom
                                        </button>
                                    </div>
                                    {showCustomTagForm && (
                                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-[1fr_110px_auto] gap-2">
                                            <input
                                                type="text"
                                                value={customTagName}
                                                onChange={(e) => setCustomTagName(e.target.value)}
                                                placeholder="Tag name"
                                                className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-[var(--heading-text)] outline-none transition-colors placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-green)]"
                                            />
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsEmojiPickerOpen((prev) => !prev)}
                                                    className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 py-2 text-sm text-left text-[var(--heading-text)] outline-none transition-colors hover:border-[var(--accent-green)]"
                                                >
                                                    {customTagEmoji || "Emoji"}
                                                </button>
                                                {isEmojiPickerOpen && (
                                                    <div className="absolute z-20 mt-2 right-0">
                                                        <EmojiPicker
                                                            onEmojiClick={(emojiData) => {
                                                                setCustomTagEmoji(emojiData.emoji);
                                                                setIsEmojiPickerOpen(false);
                                                            }}
                                                            searchDisabled={false}
                                                            previewConfig={{ showPreview: false }}
                                                            width={280}
                                                            height={340}
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                            <button
                                                type="button"
                                                onClick={addCustomTag}
                                                disabled={!customTagName.trim()}
                                                className="rounded-xl px-3 py-2 text-sm font-semibold bg-[var(--button-bg)] text-[var(--button-text)] hover:bg-[var(--button-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                            >
                                                Create
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <label className="space-y-2 md:col-span-2">
                                    <span className="text-xs font-semibold tracking-wide uppercase text-[var(--text-secondary)]">Estimated Time (Minutes)</span>
                                    <input
                                        type="number"
                                        min={1}
                                        max={600}
                                        value={newTaskEstimatedMinutes}
                                        onChange={(e) => setNewTaskEstimatedMinutes(e.target.value)}
                                        placeholder="Enter time in minutes"
                                        className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--heading-text)] outline-none transition-colors placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-green)]"
                                    />
                                </label>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeAddTaskModal}
                                    className="px-4 py-2 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--heading-text)] hover:bg-[var(--bg-secondary)] transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={addTask}
                                    disabled={!newTaskName.trim()}
                                    className="shrink-0 flex items-center gap-2 px-5 py-2 rounded-xl bg-[var(--button-bg)] text-[var(--button-text)] font-semibold hover:bg-[var(--button-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {editingTaskId && (
                    <div className="fixed inset-0 z-50 bg-[#0F172A]/45 backdrop-blur-sm flex items-center justify-center p-4">
                        <div className="w-full max-w-2xl rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-[0_24px_44px_rgba(8,15,26,0.24)]">
                            <h3 className="text-xl font-bold text-[var(--heading-text)]">Edit Task</h3>
                            <p className="mt-2 text-sm text-[var(--paragraph-text)]">Update task details below.</p>

                            <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label className="space-y-2 md:col-span-2">
                                    <span className="text-xs font-semibold tracking-wide uppercase text-[var(--text-secondary)]">Task Name</span>
                                    <input
                                        type="text"
                                        value={editTaskName}
                                        onChange={(e) => setEditTaskName(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                e.preventDefault();
                                                saveEditedTask();
                                            }
                                        }}
                                        className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--heading-text)] outline-none transition-colors placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-green)]"
                                    />
                                </label>

                                <label className="space-y-2">
                                    <span className="text-xs font-semibold tracking-wide uppercase text-[var(--text-secondary)]">Date</span>
                                    <div
                                        className="relative cursor-pointer"
                                        onClick={() => openNativeDatePicker(editDateInputRef.current)}
                                    >
                                        <input
                                            ref={editDateInputRef}
                                            type="date"
                                            value={editTaskDate}
                                            onChange={(e) => setEditTaskDate(e.target.value)}
                                            className="island-date-input w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 pr-10 text-[var(--heading-text)] outline-none transition-colors focus:border-[var(--accent-green)]"
                                        />
                                        <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-secondary)]" />
                                    </div>
                                </label>

                                <div className="space-y-2">
                                    <span className="text-xs font-semibold tracking-wide uppercase text-[var(--text-secondary)]">Tag</span>
                                    <div className="flex flex-wrap gap-2">
                                        {tagOptions.map((tag) => {
                                            const isActive = editSelectedTagId === tag.id;
                                            return (
                                                <button
                                                    key={`edit-${tag.id}`}
                                                    type="button"
                                                    onClick={() => setEditSelectedTagId(tag.id)}
                                                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-150 ${isActive
                                                        ? "border border-[rgba(34,197,94,0.5)] bg-[rgba(34,197,94,0.15)] text-[var(--heading-text)] shadow-[0_0_6px_rgba(34,197,94,0.25)]"
                                                        : "border border-[var(--border-color)] bg-[var(--card-bg)] text-[var(--text-secondary)] opacity-90 hover:text-[var(--heading-text)] hover:border-[var(--accent-green)] hover:bg-[rgba(34,197,94,0.1)]"
                                                        }`}
                                                >
                                                    {isActive && <span aria-hidden="true">✓</span>}
                                                    {tag.emoji && <span aria-hidden="true">{tag.emoji}</span>}
                                                    {tag.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                <label className="space-y-2 md:col-span-2">
                                    <span className="text-xs font-semibold tracking-wide uppercase text-[var(--text-secondary)]">Estimated Time (minutes)</span>
                                    <input
                                        type="number"
                                        min={1}
                                        max={600}
                                        value={editTaskEstimatedMinutes}
                                        onChange={(e) => setEditTaskEstimatedMinutes(e.target.value)}
                                        className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--heading-text)] outline-none transition-colors placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-green)]"
                                    />
                                </label>
                            </div>

                            <div className="mt-6 flex items-center justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeEditModal}
                                    className="px-4 py-2 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--heading-text)] hover:bg-[var(--bg-secondary)] transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={saveEditedTask}
                                    disabled={!editTaskName.trim()}
                                    className="px-5 py-2 rounded-xl bg-[var(--button-bg)] text-[var(--button-text)] font-semibold hover:bg-[var(--button-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

/* ─────────────── Main FocusNotebooks ─────────────── */

export default function FocusNotebooks() {
    const [user, setUser] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState(true);
    const [notebooks, setNotebooks] = useState<Notebook[]>(DEFAULT_NOTEBOOKS);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [notebookName, setNotebookName] = useState("");
    const [activeNotebookId, setActiveNotebookId] = useState<string | null>(null);
    const [openNotebookMenuId, setOpenNotebookMenuId] = useState<string | null>(null);
    const [renamingNotebookId, setRenamingNotebookId] = useState<string | null>(null);
    const [renameNotebookName, setRenameNotebookName] = useState("");
    const [deletingNotebookId, setDeletingNotebookId] = useState<string | null>(null);

    useEffect(() => {
        const auth = getClientAuth();
        const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
            setUser(nextUser);
            setAuthLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (authLoading) return;
        if (!user) {
            setNotebooks(DEFAULT_NOTEBOOKS);
            return;
        }

        const notebooksRef = collection(db, "users", user.uid, NOTEBOOKS_COLLECTION);

        const unsubscribe = onSnapshot(
            notebooksRef,
            (snapshot) => {
                console.log("notebooks snapshot:", snapshot.docs);
                const nextNotebooks: Notebook[] = snapshot.docs.map((snapshotDoc) => {
                    const data = snapshotDoc.data();
                    const rawTasks = Array.isArray(data.tasks) ? data.tasks : [];

                    return {
                        id: snapshotDoc.id,
                        emoji: typeof data.emoji === "string" ? data.emoji : "📒",
                        name: typeof data.name === "string" ? data.name : "Untitled Notebook",
                        createdLabel: typeof data.createdLabel === "string" ? data.createdLabel : "Created today",
                        tasks: rawTasks.map((task: Partial<Task>) => ({
                            id: typeof task.id === "string" ? task.id : `task-${Math.random().toString(36).slice(2, 8)}`,
                            name: typeof task.name === "string" ? task.name : "",
                            date: typeof task.date === "string" ? task.date : "",
                            tag: typeof task.tag === "string" ? task.tag : "",
                            emoji: typeof task.emoji === "string" ? task.emoji : "",
                            estimatedMinutes: typeof task.estimatedMinutes === "number" ? task.estimatedMinutes : null,
                            remainingMinutes: typeof task.remainingMinutes === "number" ? task.remainingMinutes : null,
                            completed: Boolean(task.completed),
                        })),
                    };
                });

                setNotebooks(nextNotebooks);
            },
            (error) => {
                console.error("Error listening focus notebooks:", error);
            }
        );

        return () => unsubscribe();
    }, [user, authLoading]);

    useEffect(() => {
        if (!openNotebookMenuId) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement | null;
            if (!target?.closest("[data-notebook-menu-root='true']")) {
                setOpenNotebookMenuId(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [openNotebookMenuId]);

    const activeNotebook = activeNotebookId
        ? notebooks.find((n) => n.id === activeNotebookId) ?? null
        : null;

    const canCreateNotebook = notebookName.trim().length > 0;

    const openRenameNotebookModal = (notebook: Notebook) => {
        setOpenNotebookMenuId(null);
        setRenamingNotebookId(notebook.id);
        setRenameNotebookName(notebook.name);
    };

    const closeRenameNotebookModal = () => {
        setRenamingNotebookId(null);
        setRenameNotebookName("");
    };

    const saveNotebookRename = async () => {
        const trimmed = renameNotebookName.trim();
        if (!trimmed || !renamingNotebookId) return;

        if (user) {
            try {
                await updateDoc(doc(db, "users", user.uid, NOTEBOOKS_COLLECTION, renamingNotebookId), {
                    name: trimmed,
                    updatedAt: serverTimestamp(),
                });
            } catch (error) {
                console.error("Error renaming focus notebook:", error);
                return;
            }
        } else {
            setNotebooks((prev) => prev.map((notebook) => (
                notebook.id === renamingNotebookId ? { ...notebook, name: trimmed } : notebook
            )));
        }

        closeRenameNotebookModal();
    };

    const deleteNotebook = async () => {
        if (!deletingNotebookId) return;

        if (user) {
            try {
                await deleteDoc(doc(db, "users", user.uid, NOTEBOOKS_COLLECTION, deletingNotebookId));
            } catch (error) {
                console.error("Error deleting focus notebook:", error);
                return;
            }
        } else {
            setNotebooks((prev) => prev.filter((notebook) => notebook.id !== deletingNotebookId));
        }

        if (activeNotebookId === deletingNotebookId) {
            setActiveNotebookId(null);
        }

        setDeletingNotebookId(null);
        setOpenNotebookMenuId(null);
    };

    const handleCreateNotebook = async () => {
        const trimmed = notebookName.trim();
        if (!trimmed) return;

        if (!user) {
            console.error("Cannot create notebook: no authenticated user.");
            return;
        }

        const randomEmoji = NOTEBOOK_EMOJI_POOL[Math.floor(Math.random() * NOTEBOOK_EMOJI_POOL.length)] || "📒";
        try {
            console.log("Creating notebook for user:", user.uid);

            await setDoc(
                doc(db, "users", user.uid),
                { updatedAt: serverTimestamp() },
                { merge: true }
            );

            const docRef = await addDoc(collection(db, "users", user.uid, NOTEBOOKS_COLLECTION), {
                emoji: randomEmoji,
                name: trimmed,
                createdLabel: "Created today",
                tasks: [],
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });

            console.log("Notebook successfully written to Firestore");

            setNotebooks((prev) => {
                if (prev.some((notebook) => notebook.id === docRef.id)) {
                    return prev;
                }

                return [
                    ...prev,
                    {
                        id: docRef.id,
                        emoji: randomEmoji,
                        name: trimmed,
                        createdLabel: "Created today",
                        tasks: [],
                    },
                ];
            });
            setActiveNotebookId(docRef.id);
        } catch (error) {
            console.error("Error creating focus notebook:", error);
            return;
        }

        setIsCreateModalOpen(false);
        setNotebookName("");
    };

    const handleUpdateTasks = useCallback((notebookId: string, tasks: Task[]) => {
        setNotebooks((prev) =>
            prev.map((n) => (n.id === notebookId ? { ...n, tasks } : n))
        );

        if (!user) return;

        updateDoc(doc(db, "users", user.uid, NOTEBOOKS_COLLECTION, notebookId), {
            tasks,
            updatedAt: serverTimestamp(),
        }).catch((error) => {
            console.error("Error updating focus notebook tasks:", error);
        });
    }, [user]);

    useEffect(() => {
        const handleFocusSessionCompleted = (event: Event) => {
            const customEvent = event as CustomEvent<{
                notebookId: string;
                taskId: string;
                minutes: number;
            }>;

            const detail = customEvent.detail;
            if (!detail) return;
            const completedMinutes = Math.max(0, Number(detail.minutes) || 0);
            if (completedMinutes <= 0) return;

            setNotebooks((prev) =>
                prev.map((notebook) => {
                    if (notebook.id !== detail.notebookId) {
                        return notebook;
                    }

                    return {
                        ...notebook,
                        tasks: notebook.tasks.map((task) => {
                            if (task.id !== detail.taskId) {
                                return task;
                            }

                            const currentRemaining = task.remainingMinutes ?? task.estimatedMinutes;
                            if (currentRemaining === null) {
                                return task;
                            }

                            const nextRemaining = Math.max(0, currentRemaining - completedMinutes);

                            return {
                                ...task,
                                remainingMinutes: nextRemaining,
                                completed: task.completed || nextRemaining <= 0,
                            };
                        }),
                    };
                })
            );
        };

        window.addEventListener("focus-session-completed", handleFocusSessionCompleted as EventListener);
        return () => {
            window.removeEventListener("focus-session-completed", handleFocusSessionCompleted as EventListener);
        };
    }, []);

    /* ── Room view ── */
    if (activeNotebook) {
        return (
            <NotebookRoom
                notebook={activeNotebook}
                onBack={() => setActiveNotebookId(null)}
                onUpdateTasks={handleUpdateTasks}
            />
        );
    }

    /* ── Grid view ── */
    return (
        <section className="max-w-[1200px] mx-auto px-6 pb-12">
            <div className="rounded-[32px] border border-[var(--border-color)] bg-[color:color-mix(in_srgb,var(--card-bg)_88%,transparent)] p-6 md:p-8 shadow-[0_18px_40px_rgba(8,15,26,0.12)] backdrop-blur-sm">
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--heading-text)]">Focus Notebooks</h2>
                <p className="mt-2 text-sm md:text-base text-[var(--paragraph-text)]">Organize tasks for each focus session</p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
                    <button
                        type="button"
                        onClick={() => setIsCreateModalOpen(true)}
                        className="group min-h-[150px] cursor-pointer rounded-2xl border border-dashed border-[var(--border-color)] bg-[var(--bg-secondary)] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent-green)] hover:bg-[color:color-mix(in_srgb,var(--bg-secondary)_82%,var(--card-bg))] hover:shadow-[0_14px_24px_rgba(8,15,26,0.12)]"
                    >
                        <span className="text-3xl leading-none text-[var(--accent-green)] block">+</span>
                        <p className="mt-4 text-base font-semibold text-[var(--heading-text)]">Create Focus Notebook</p>
                        <p className="mt-1 text-xs text-[var(--text-secondary)]">Start a fresh workspace</p>
                    </button>

                    {notebooks.map((notebook) => (
                        <div
                            key={notebook.id}
                            className="group relative min-h-[150px] rounded-2xl border border-[var(--border-color)] bg-[color:color-mix(in_srgb,var(--card-bg)_88%,transparent)] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_24px_rgba(8,15,26,0.12)]"
                        >
                            <button
                                type="button"
                                onClick={() => setActiveNotebookId(notebook.id)}
                                className="block w-full text-left"
                                aria-label={`Open notebook ${notebook.name}`}
                            >
                                <span className="text-lg" aria-hidden="true">{notebook.emoji || "📒"}</span>
                                <p className="mt-3 text-base font-semibold text-[var(--heading-text)] line-clamp-2">{notebook.name}</p>
                                <p className="mt-2 text-xs text-[var(--text-secondary)]">{notebook.createdLabel} · {notebook.tasks.length} tasks</p>
                            </button>

                            <div className="absolute right-4 top-4 z-10 flex items-start justify-end" data-notebook-menu-root="true">
                                <button
                                    type="button"
                                    onClick={(event) => {
                                        event.preventDefault();
                                        event.stopPropagation();
                                        setOpenNotebookMenuId((prev) => (prev === notebook.id ? null : notebook.id));
                                    }}
                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)] opacity-0 transition-opacity duration-150 hover:text-[var(--heading-text)] group-hover:opacity-100"
                                    aria-label={`Open notebook menu for ${notebook.name}`}
                                >
                                    <MoreHorizontal className="h-4 w-4" />
                                </button>

                                {openNotebookMenuId === notebook.id && (
                                    <div
                                        className="absolute right-0 top-9 z-20 min-w-[168px] rounded-[10px] border border-[var(--border-color)] bg-[var(--bg-secondary)] p-1.5 shadow-[0_14px_28px_rgba(8,15,26,0.2)]"
                                        onClick={(event) => {
                                            event.preventDefault();
                                            event.stopPropagation();
                                        }}
                                    >
                                        <button
                                            type="button"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                event.stopPropagation();
                                                openRenameNotebookModal(notebook);
                                            }}
                                            className="block w-full rounded-lg px-3 py-2 text-left text-sm text-[var(--heading-text)] transition-colors hover:bg-[var(--bg-primary)]"
                                        >
                                            Rename notebook
                                        </button>
                                        <button
                                            type="button"
                                            onClick={(event) => {
                                                event.preventDefault();
                                                event.stopPropagation();
                                                setOpenNotebookMenuId(null);
                                                setDeletingNotebookId(notebook.id);
                                            }}
                                            className="block w-full rounded-lg px-3 py-2 text-left text-sm text-[#ff6b6b] transition-colors hover:bg-[var(--bg-primary)]"
                                        >
                                            Delete notebook
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 bg-[#0F172A]/45 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-md rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-[0_24px_44px_rgba(8,15,26,0.24)]">
                        <h3 className="text-xl font-bold text-[var(--heading-text)]">Create Focus Notebook</h3>
                        <p className="mt-2 text-sm text-[var(--paragraph-text)]">Give your notebook a name to get started.</p>

                        <div className="mt-5">
                            <label htmlFor="notebook-name" className="text-xs font-semibold tracking-wide uppercase text-[var(--text-secondary)]">Notebook Name</label>
                            <input
                                id="notebook-name"
                                type="text"
                                value={notebookName}
                                onChange={(event) => setNotebookName(event.target.value)}
                                onInput={(event) => setNotebookName((event.target as HTMLInputElement).value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleCreateNotebook();
                                    }
                                }}
                                placeholder="My Focus Workspace"
                                className="mt-2 w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 py-2.5 text-[var(--heading-text)] outline-none transition-colors focus:border-[var(--accent-green)]"
                            />
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsCreateModalOpen(false);
                                    setNotebookName("");
                                }}
                                className="px-4 py-2 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--heading-text)] hover:bg-[var(--bg-secondary)] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleCreateNotebook}
                                disabled={!canCreateNotebook}
                                className="px-5 py-2 rounded-xl bg-[var(--button-bg)] text-[var(--button-text)] font-semibold hover:bg-[var(--button-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {renamingNotebookId && (
                <div className="fixed inset-0 z-50 bg-[#0F172A]/45 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-md rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-[0_24px_44px_rgba(8,15,26,0.24)]">
                        <h3 className="text-xl font-bold text-[var(--heading-text)]">Rename notebook</h3>
                        <div className="mt-5">
                            <input
                                type="text"
                                value={renameNotebookName}
                                onChange={(event) => setRenameNotebookName(event.target.value)}
                                onKeyDown={(event) => {
                                    if (event.key === "Enter") {
                                        event.preventDefault();
                                        saveNotebookRename();
                                    }
                                }}
                                autoFocus
                                className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-3 py-2.5 text-[var(--heading-text)] outline-none transition-colors focus:border-[var(--accent-green)]"
                            />
                        </div>

                        <div className="mt-6 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={closeRenameNotebookModal}
                                className="px-4 py-2 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--heading-text)] hover:bg-[var(--bg-secondary)] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={saveNotebookRename}
                                disabled={!renameNotebookName.trim()}
                                className="px-5 py-2 rounded-xl bg-[var(--button-bg)] text-[var(--button-text)] font-semibold hover:bg-[var(--button-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {deletingNotebookId && (
                <div className="fixed inset-0 z-50 bg-[#0F172A]/45 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="w-full max-w-md rounded-3xl border border-[var(--border-color)] bg-[var(--card-bg)] p-6 shadow-[0_24px_44px_rgba(8,15,26,0.24)]">
                        <h3 className="text-xl font-bold text-[var(--heading-text)]">Delete this notebook?</h3>
                        <p className="mt-2 text-sm text-[var(--text-secondary)]">This action cannot be undone.</p>
                        <div className="mt-6 flex items-center justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => setDeletingNotebookId(null)}
                                className="px-4 py-2 rounded-xl border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--heading-text)] hover:bg-[var(--bg-secondary)] transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={deleteNotebook}
                                className="px-5 py-2 rounded-xl bg-[#ff6b6b] text-white font-semibold hover:bg-[#ff5a5a] transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
