export interface Game {
    id: string;
    title: string;
    description: string;
    icon: string;
    href: string;
    color: string;
}

export const GAMES_LIST: Game[] = [
    {
        id: "math-challenge",
        title: "Math Speed Challenge",
        description: "Solve math problems as fast as you can. Test your mental calculation speed with addition, subtraction, multiplication, and division.",
        icon: "Calculator",
        href: "/games/math-speed",
        color: "var(--accent-green)",
    },
    {
        id: "typing-challenge",
        title: "Typing Speed Challenge",
        description: "Test and improve your typing speed. Track your WPM and accuracy with timed challenges or full text modes.",
        icon: "Keyboard",
        href: "/games/typing-speed",
        color: "#3b82f6",
    },
    {
        id: "reaction-test",
        title: "Reaction Speed Test",
        description: "Test how fast your reflexes are. Click as fast as possible when the screen turns green and measure your reaction time.",
        icon: "Zap",
        href: "/games/reaction",
        color: "#f59e0b",
    },
    {
        id: "memory-game",
        title: "Memory Card Game",
        description: "Test and improve your memory skills. Match pairs of cards in this classic brain training game with multiple difficulty levels.",
        icon: "Layers",
        href: "/games/memory",
        color: "#8b5cf6",
    },
    {
        id: "pattern-game",
        title: "Number Pattern Test",
        description: "Challenge your logic and IQ with number patterns. Find the next number in the sequence and test your brain!",
        icon: "Lightbulb",
        href: "/games/number-pattern",
        color: "#ec4899",
    },
    {
        id: "focus-test",
        title: "Focus Test",
        description: "Train your focus by clicking only green circles. Avoid all other shapes and test your concentration!",
        icon: "Eye",
        href: "/games/focus",
        color: "#06b6d4",
    },
];

export const GAMES_COUNT = GAMES_LIST.length;
