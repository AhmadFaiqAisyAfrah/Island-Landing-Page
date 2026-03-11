"use client";

import { useState, useCallback, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowLeft, Plus, Check } from "lucide-react";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

type Task = {
    id: string;
    name: string;
    date: string;
    tag: string;
    emoji: string;
    estimatedMinutes: number | null;
    completed: boolean;
};

type TagOption = {
    id: string;
    label: string;
    emoji: string;
};

type Notebook = {
    id: string;
    name: string;
    createdLabel: string;
    tasks: Task[];
};

const DEFAULT_NOTEBOOKS: Notebook[] = [
    { id: "ui-design", name: "UI Design Tasks", createdLabel: "Created today", tasks: [] },
    { id: "study-biology", name: "Study Biology", createdLabel: "Created today", tasks: [] },
    { id: "math-drills", name: "Math Drills", createdLabel: "Created today", tasks: [] },
    { id: "reading-notes", name: "Reading Notes", createdLabel: "Created today", tasks: [] },
];

const DEFAULT_TAG_OPTIONS: TagOption[] = [
    { id: "none", label: "None", emoji: "" },
    { id: "study", label: "Study", emoji: "📘" },
    { id: "work", label: "Work", emoji: "💼" },
    { id: "reading", label: "Reading", emoji: "📖" },
    { id: "writing", label: "Writing", emoji: "✍️" },
    { id: "mindfulness", label: "Mindfulness", emoji: "🌿" },
];

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
    const [newTaskName, setNewTaskName] = useState("");
    const [newTaskDate, setNewTaskDate] = useState("");
    const [newTaskEstimatedMinutes, setNewTaskEstimatedMinutes] = useState("");
    const [tagOptions, setTagOptions] = useState<TagOption[]>(DEFAULT_TAG_OPTIONS);
    const [selectedTagId, setSelectedTagId] = useState("none");
    const [showCustomTagForm, setShowCustomTagForm] = useState(false);
    const [customTagName, setCustomTagName] = useState("");
    const [customTagEmoji, setCustomTagEmoji] = useState("");
    const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
    const dateInputRef = useRef<HTMLInputElement | null>(null);

    const formatDateLabel = (dateValue: string) => {
        if (!dateValue) return "";
        const date = new Date(dateValue);
        if (Number.isNaN(date.getTime())) return "";
        return new Intl.DateTimeFormat("en-GB", { day: "2-digit", month: "short" }).format(date);
    };

    const addTask = () => {
        const trimmed = newTaskName.trim();
        if (!trimmed) return;

        const selectedTag = tagOptions.find((tag) => tag.id === selectedTagId);
        const parsedMinutes = Number.parseInt(newTaskEstimatedMinutes, 10);
        const estimatedMinutes = Number.isNaN(parsedMinutes) || parsedMinutes <= 0 ? null : parsedMinutes;

        const task: Task = {
            id: `task-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            name: trimmed,
            date: newTaskDate,
            tag: selectedTag && selectedTag.id !== "none" ? selectedTag.label : "",
            emoji: selectedTag && selectedTag.id !== "none" ? selectedTag.emoji : "",
            estimatedMinutes,
            completed: false,
        };

        onUpdateTasks(notebook.id, [...notebook.tasks, task]);
        setNewTaskName("");
        setNewTaskDate("");
        setNewTaskEstimatedMinutes("");
        setSelectedTagId("none");
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
                    {notebook.name}
                </h2>

                <div className="mt-6 border-t border-[var(--border-color)]" />

                <p className="mt-6 text-base font-semibold text-[var(--heading-text)]">+ Add Task</p>

                {/* Add Task input */}
                <div className="mt-3 rounded-2xl border border-[var(--border-color)] bg-[color:color-mix(in_srgb,var(--bg-secondary)_52%,white)] p-4 md:p-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                            <input
                                ref={dateInputRef}
                                type="date"
                                value={newTaskDate}
                                onChange={(e) => setNewTaskDate(e.target.value)}
                                onClick={() => dateInputRef.current?.showPicker?.()}
                                onFocus={() => dateInputRef.current?.showPicker?.()}
                                className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--heading-text)] outline-none transition-colors focus:border-[var(--accent-green)]"
                            />
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
                                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${isActive
                                                ? "border-[color:color-mix(in_srgb,var(--accent-green)_40%,var(--border-color))] bg-[color:color-mix(in_srgb,var(--bg-secondary)_72%,white)] text-[var(--heading-text)]"
                                                : "border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--heading-text)]"
                                                }`}
                                        >
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
                            <span className="text-xs font-semibold tracking-wide uppercase text-[var(--text-secondary)]">Estimated Time (minutes)</span>
                            <div className="flex items-center gap-3">
                                <input
                                    type="number"
                                    min={1}
                                    max={600}
                                    value={newTaskEstimatedMinutes}
                                    onChange={(e) => setNewTaskEstimatedMinutes(e.target.value)}
                                    placeholder="Enter time in minutes"
                                    className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] px-4 py-3 text-[var(--heading-text)] outline-none transition-colors placeholder:text-[var(--text-secondary)] focus:border-[var(--accent-green)]"
                                />
                                <button
                                    type="button"
                                    onClick={addTask}
                                    disabled={!newTaskName.trim()}
                                    className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl bg-[var(--button-bg)] text-[var(--button-text)] font-semibold hover:bg-[var(--button-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add
                                </button>
                            </div>
                        </label>
                    </div>
                </div>

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

                    {notebook.tasks.map((task) => (
                        <button
                            key={task.id}
                            type="button"
                            onClick={() => toggleTask(task.id)}
                            className={`w-full flex items-start justify-between gap-4 rounded-xl px-4 py-3 text-left transition-all duration-200 hover:bg-[var(--bg-secondary)] ${task.completed ? "opacity-80" : ""
                                }`}
                        >
                            <div className="flex items-start gap-3 min-w-0">
                                {/* Checkbox */}
                                <span
                                    className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors duration-200 ${task.completed
                                        ? "bg-[var(--accent-green)] border-[var(--accent-green)]"
                                        : "border-[var(--border-color)]"
                                        }`}
                                >
                                    {task.completed && <Check className="w-3.5 h-3.5 text-white" />}
                                </span>

                                {/* Text */}
                                <span
                                    className={`text-base text-[var(--heading-text)] transition-all duration-200 break-words ${task.completed ? "line-through" : ""
                                        }`}
                                >
                                    {task.name}
                                </span>
                            </div>

                            <div className="flex flex-wrap items-center justify-end gap-2 max-w-[50%]">
                                {task.tag && (
                                    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border-color)] bg-[color:color-mix(in_srgb,var(--bg-secondary)_68%,white)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)]">
                                        <span aria-hidden="true">{task.emoji || "🏷"}</span>
                                        {task.tag}
                                    </span>
                                )}
                                {task.estimatedMinutes !== null && (
                                    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border-color)] bg-[color:color-mix(in_srgb,var(--bg-secondary)_68%,white)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)]">
                                        <span aria-hidden="true">⏱</span>
                                        {task.estimatedMinutes}m
                                    </span>
                                )}
                                {task.date && (
                                    <span className="inline-flex items-center gap-1 rounded-full border border-[var(--border-color)] bg-[color:color-mix(in_srgb,var(--bg-secondary)_68%,white)] px-2.5 py-1 text-xs font-medium text-[var(--text-secondary)]">
                                        <span aria-hidden="true">📅</span>
                                        {formatDateLabel(task.date)}
                                    </span>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ─────────────── Main FocusNotebooks ─────────────── */

export default function FocusNotebooks() {
    const [notebooks, setNotebooks] = useState<Notebook[]>(DEFAULT_NOTEBOOKS);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [notebookName, setNotebookName] = useState("");
    const [activeNotebookId, setActiveNotebookId] = useState<string | null>(null);

    const activeNotebook = activeNotebookId
        ? notebooks.find((n) => n.id === activeNotebookId) ?? null
        : null;

    const handleCreateNotebook = () => {
        const trimmed = notebookName.trim();
        if (!trimmed) return;

        const newNotebook: Notebook = {
            id: `notebook-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            name: trimmed,
            createdLabel: "Created today",
            tasks: [],
        };

        setNotebooks((prev) => [...prev, newNotebook]);
        setIsCreateModalOpen(false);
        setNotebookName("");
        // Open the notebook room immediately
        setActiveNotebookId(newNotebook.id);
    };

    const handleUpdateTasks = useCallback((notebookId: string, tasks: Task[]) => {
        setNotebooks((prev) =>
            prev.map((n) => (n.id === notebookId ? { ...n, tasks } : n))
        );
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
                        className="group min-h-[150px] rounded-2xl border border-dashed border-[var(--accent-green)]/60 bg-[color:color-mix(in_srgb,var(--bg-secondary)_70%,white)] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_24px_rgba(8,15,26,0.12)]"
                    >
                        <span className="text-3xl leading-none text-[var(--accent-green)] block">+</span>
                        <p className="mt-4 text-base font-semibold text-[var(--heading-text)]">Create Focus Notebook</p>
                        <p className="mt-1 text-xs text-[var(--text-secondary)]">Start a fresh workspace</p>
                    </button>

                    {notebooks.map((notebook) => (
                        <button
                            key={notebook.id}
                            type="button"
                            onClick={() => setActiveNotebookId(notebook.id)}
                            className="min-h-[150px] rounded-2xl border border-[var(--border-color)] bg-[color:color-mix(in_srgb,var(--card-bg)_88%,transparent)] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_24px_rgba(8,15,26,0.12)]"
                        >
                            <span className="text-lg" aria-hidden="true">📒</span>
                            <p className="mt-3 text-base font-semibold text-[var(--heading-text)] line-clamp-2">{notebook.name}</p>
                            <p className="mt-2 text-xs text-[var(--text-secondary)]">{notebook.createdLabel} · {notebook.tasks.length} tasks</p>
                        </button>
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
                                disabled={!notebookName.trim()}
                                className="px-5 py-2 rounded-xl bg-[var(--button-bg)] text-[var(--button-text)] font-semibold hover:bg-[var(--button-hover)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
