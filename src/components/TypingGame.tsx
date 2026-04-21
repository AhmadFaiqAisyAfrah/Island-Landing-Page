"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Keyboard, Trophy, Play, RotateCcw, Clock, Target, Zap, ChevronLeft, BookOpen } from "lucide-react";
import GameResultLayout from "./GameResultLayout";

type GameMode = "timed" | "fulltext";
type GameState = "menu" | "playing" | "gameover";

const SENTENCES: string[] = [
    "The quick brown fox jumps over the lazy dog.",
    "Practice makes perfect when learning new skills.",
    "Sunshine brightens the morning sky with golden light.",
    "Books open doors to worlds unknown.",
    "Music soothes the soul and lifts spirits.",
    "Every challenge is an opportunity to grow.",
    "Learning never exhausts the mind but enriches it.",
    "The ocean waves crash against the sandy shore.",
    "Coffee aroma fills the kitchen each morning.",
    "Stars twinkle brightly in the night sky.",
    "Time flies when you are having fun.",
    "Success comes to those who work hard.",
    "Nature provides peace and calm for the mind.",
    "Dreams inspire us to reach higher.",
    "Reading expands the mind and sparks creativity.",
    "Teamwork makes the dream work.",
    "Adventure awaits around every corner.",
    "Knowledge is power when applied wisely.",
    "Creativity blooms in the garden of imagination.",
    "Laughter is the best medicine.",
    "The early bird catches the worm.",
    "A journey of a thousand miles starts with a step.",
    "Where there is a will there is a way.",
    "Actions speak louder than words.",
    "The pen is mightier than the sword.",
    "All that glitters is not gold.",
    "Better late than never.",
    "Birds of a feather flock together.",
    "Curiosity killed the cat.",
    "Every cloud has a silver lining.",
    "Fortune favors the bold.",
    "Great minds think alike.",
    "If at first you don't succeed try again.",
    "Knowledge speaks but wisdom listens.",
    "Make hay while the sun shines.",
    "Never say never.",
    "Practice what you preach.",
    "Quality is better than quantity.",
    "Rome was not built in a day.",
    "Silence is golden.",
    "Time and tide wait for no one.",
    "Unity is strength.",
    "Vision without action is merely a dream.",
    "When life gives you lemons make lemonade.",
    "You can't judge a book by its cover.",
    "A rolling stone gathers no moss.",
    "An apple a day keeps the doctor away.",
    "Better safe than sorry.",
    "Break the ice with kindness.",
    "Burning the midnight oil pays off.",
    "Get your act together.",
    "Go the extra mile.",
    "Haste makes waste.",
    "Heart of gold is precious.",
    "Hit the nail on the head.",
    "Keep your chin up.",
    "Kill two birds with one stone.",
    "Leave no stone unturned.",
    "Level the playing field.",
    "Make ends meet.",
    "No pain no gain.",
    "On thin ice be careful.",
    "Once in a blue moon.",
    "Piece of cake is easy.",
    "Put all your eggs in one basket.",
    "Read between the lines.",
    "Rules of the game are clear.",
    "See eye to eye.",
    "Spill the beans.",
    "Step up your game.",
    "Take with a grain of salt.",
    "The ball is in your court.",
    "Throw in the towel.",
    "Under the weather.",
    "Wake up and smell the coffee.",
    "Walk a mile in someone else's shoes.",
    "When pigs fly will never happen.",
    "A blessing in disguise.",
    "A perfect storm approaches.",
    "Back to square one.",
    "Beggars can't be choosers.",
    "Bend over backwards to help.",
    "Better late than never to start.",
    "A watched pot never boils.",
    "Absence makes the heart grow fonder.",
    "Actions speak louder than words ever.",
    "Adversity makes strange bedfellows.",
    "All good things must come to an end.",
    "All's well that ends well always.",
    "An ounce of prevention is worth more.",
    "As you make your bed so you lie.",
    "At the end of the day we rest.",
    "Bad news travels fast indeed.",
    "Beauty is in the eye of the beholder.",
    "Beauty is only skin deep really.",
    "Beginner's luck happens to many.",
    "Better to have loved and lost.",
    "Birds of a feather flock together.",
    "Blood is thicker than water truly.",
    "Boys will be boys no matter what.",
    "Bread never falls but butter side.",
    "Burn bridges when you must choose.",
    "Can judge a man by company he keeps.",
    "Carpe diem seize the day today.",
    "Caution is the parent of safety.",
    "Charity begins at home as always.",
    "Cheaters never win in the long run.",
    "Cleanliness is next to godliness.",
    "Clothes make the man matter most.",
    "Clouds come and go but rain falls.",
    "Common sense is not so common.",
    "Contentment is greater than wealth.",
    "Count your blessings one by one.",
    "Cowards die many times before death.",
    "Cowards die a thousand deaths.",
    "Crime does not pay in the end.",
    "Cut your coat according to cloth.",
    "Damned if you do and damned if not.",
    "Dead men tell no tales at all.",
    "Debt is a curse to many.",
    "Desperate times need desperate measures.",
    "Devil finds work for idle hands.",
    "Do not count your chickens yet.",
    "Do not cry over spilled milk.",
    "Do not look a gift horse in mouth.",
    "Do not put all eggs in one basket.",
    "Do not rock the boat much.",
    "Do not throw pearls before swine.",
    "Do unto others as you want done.",
    "Dog does not eat dog always.",
    "Dollar makes a man move fast.",
    "Don't bite the hand that feeds you.",
    "Don't burn your bridges behind you.",
    "Don't cross the bridge till come.",
    "Don't fire until you see whites.",
    "Don't give a sucker an even break.",
    "Don't go breaking any hearts here.",
    "Don't have too many irons in fire.",
    "Don't make a mountain out molehill.",
    "Don't put off till tomorrow what.",
    "Don't speak until you are spoken.",
    "Don't take any wooden nickels.",
    "Don't throw the baby out with bath.",
    "Drinking is a costly pleasure.",
    "Drunken lips speak sober heart.",
    "Early to bed and early to rise.",
    "Eat, drink, and be merry today.",
    "Empty vessels make most noise.",
    "Enough is as good as a feast.",
    "Even a worm will turn at times.",
    "Every dog has his day to shine.",
    "Every man for himself at end.",
    "Every man has his price to pay.",
    "Every picture tells a story now.",
    "Every rose has its thorn inside.",
    "Everyone must believe in something.",
    "Everything has an end to it.",
    "Exercise is good for your health.",
    "Eye for an eye and tooth for.",
    "Fact is stranger than fiction.",
    "Failure is the stepping stone.",
    "Fair and softly goes far in.",
    "Fair exchange is no robbery.",
    "Faith can move mountains in life.",
    "Fall seven times stand up eight.",
    "Fame has织物 also hunger for.",
    "Familiarity breeds contempt for.",
    "Fancy is the thing that counts.",
    "Far fished seek too deep for.",
    "Fast and loose with the truth.",
    "Fat cats never have enough.",
    "Feed a cold and starve a fever.",
    "Few and far between are friends.",
    "Fight fire with fire always.",
    "Fine feathers make fine birds.",
    "Fine words butter no parsnips.",
    "First come first served is rule.",
    "First impressions are lasting.",
    "First things first in all life.",
    "Fish and guests smell after three.",
    "Flattery will get you anywhere.",
    "Flog a dead horse waste of time.",
    "Fools and their money soon part.",
    "Fools rush in where angels fear.",
    "For want of a nail battle lost.",
    "Forewarned is forearmed always.",
    "Four eyes see more than two.",
    "Friend in need is a friend indeed.",
    "Friends are the family we choose.",
    "From the sublime to the ridiculous.",
    "Full cup is steady but empty.",
    "Garbage in garbage out always.",
    "Gather ye rosebuds while ye may.",
    "Genius is one percent inspiration.",
    "Get a second wind in life.",
    "Give a lie a long leash.",
    "Give a man enough rope and.",
    "Give him an inch and he takes.",
    "Give the devil his due always.",
    "Go to the ant consider ways.",
    "God helps those who help themselves.",
    "Going to the dogs is not good.",
    "Gold is not food but hunger.",
    "Good and quickly seldom well done.",
    "Good wine needs no bush advice.",
    "Grasp all and lose all indeed.",
    "Great minds think alike but.",
    "Green wood burns hotter than dry.",
    "Half a loaf is better than.",
    "Handsome is that handsome does.",
    "Happiness is a warm puppy love.",
    "Happy is the man who learns.",
    "Hard cases make bad law always.",
    "Hard work pays off in end.",
    "Haste makes waste in life.",
    "Hatred is as harmful as fire.",
    "Have a dog and bark yourself.",
    "Have a good name for nothing.",
    "He laughs best who laughs last.",
    "He who疫情防控 is master of.",
    "He who laughs last laughs best.",
    "He who lives by the sword.",
    "He who makes no mistakes makes.",
    "He who pays the piper calls.",
    "He who questions is a fool.",
    "He who seeks finds always.",
    "He who sups with devil needs.",
    "Health is better than wealth.",
    "Heaven helps those who help.",
    "Hell has no fury like a.",
    "Help a lame dog over a.",
    "Here today and gone tomorrow.",
    "History repeats itself always.",
    "Hitch your wagon to a star.",
    "Hoist with his own petard.",
    "Home is where the heart is.",
    "Honesty is the best policy.",
    "Hope for the best but prepare.",
    "Horses for courses is wise.",
    "If anything can go wrong it.",
    "If at first you don't succeed.",
    "If God had wanted us naked.",
    "If it ain't broke don't fix.",
    "If it doesn't kill you it.",
    "If pigs had wings they'd fly.",
    "If the cap fits wear it.",
    "If the shoe fits wear it.",
    "If wishes were horses beggars would.",
    "If you can't beat them join.",
    "If you can't be good be.",
    "If you can't do be content.",
    "If you lie down with dogs.",
    "If you play with fire you.",
    "Ignorance is bliss but only.",
    "Ignorance of the law is.",
    "Imitation is the sincerest form.",
    "In for a penny in for.",
    "In the kingdom of blind men.",
    "In the land of the blind.",
    "In the long run we all.",
    "In this world nothing can.",
    "Industry is the parent of.",
    "It is a poor workman.",
    "It is a wise father that.",
    "It is best to be on.",
    "It is better to be safe.",
    "It is better to give than.",
    "It is better to have loved.",
    "It is an ill wind that.",
    "It is easy to be wise.",
    "It is never too late to.",
    "It is no use crying over.",
    "It is the first step that.",
    "It never rains but it.",
    "It pays to be obvious about.",
    "It's a poor heart that never.",
    "It's an ill bird that fouls.",
    "Jack of all trades master.",
    "Jam tomorrow and jam yesterday.",
    "Judge not that ye be.",
    "Justice is blind but has.",
    "Keep calm and carry on.",
    "Keep something for a rainy.",
    "Keep the ball rolling always.",
    "Kill the goose that lays.",
    "Kill two birds with one stone.",
    "Kings have long arms and.",
    "Laughter is the best medicine.",
    "Lazy hands make a man.",
    "Learn to walk before you.",
    "Least said soonest mended in.",
    "Lend your money and lose.",
    "Let bygones be bygones now.",
    "Let him who is without sin.",
    "Let the cat out of bag.",
    "Let the dead bury the dead.",
    "Let's agree to disagree please.",
    "Lie in the bed you have.",
    "Life begins at forty it.",
    "Life is just a bowl.",
    "Life is not a rehearsal.",
    "Life is short and art.",
    "Light a candle instead of.",
    "Like a duck to water.",
    "Like a fish out of water.",
    "Like a moth to a flame.",
    "Like father like son in.",
    "Like mother like daughter as.",
    "Like the goose so the.",
    "Line forms to the right.",
    "Little pitchers have big ears.",
    "Little strokes fell great oaks.",
    "Live and let live together.",
    "Live to fight another day.",
    "Long absent soon forgotten is.",
    "Look before you leap always.",
    "Lookers on see most of.",
    "Losers are always in the.",
    "Loss of time is never.",
    "Lost time is never found.",
    "Love and a cough cannot.",
    "Love and money make the.",
    "Love conquers all in the.",
    "Love is blind as they.",
    "Love is never having to.",
    "Love makes the world go.",
    "Lovers live in a world.",
    "Lying is the first step.",
    "Make a virtue of necessity.",
    "Make hay while the sun.",
    "Make lemonade when life gives.",
    "Man does not live by.",
    "Man is known by the.",
    "Man proposes but God disposes.",
    "Many a good cow has.",
    "Many a little makes a.",
    "Many a true word is.",
    "Many are called but few.",
    "Many hands make light work.",
    "March comes in like a.",
    "Marriage is a lottery for.",
    "Marry in haste and repent.",
    "Matter is of little consequence.",
    "Measure twice cut once is.",
    "Men are not the only.",
    "Might is right in some.",
    "Mighty oaks from little acorns.",
    "Misery loves company in life.",
    "Miss is as good as.",
    "Money doesn't grow on trees.",
    "Money is a good servant.",
    "Money is the root of.",
    "Money isn't everything but it's.",
    "More haste less speed in.",
    "More than one way to.",
    "Murder will out in end.",
    "Music is the food of.",
    "My country right or wrong.",
    "Nature abhors a vacuum but.",
    "Necessity is the mother of.",
    "Needs must when the devil.",
    "Neither a borrower nor a.",
    "Never be the first to.",
    "Never be too sure of.",
    "Never bite the hand that.",
    "Never judge a book by.",
    "Never look a gift horse.",
    "Never make a mountain out.",
    "Never put off till tomorrow.",
    "Never say die and always.",
    "Never speak ill of the.",
    "Never step on a wet.",
    "Never swap horses in midstream.",
    "New lords new laws for.",
    "New wine in old bottles.",
    "Next to being witty yourself.",
    "Nice guys finish last but.",
    "Nine lives has a cat.",
    "Ninety percent of everything is.",
    "No action without reaction ever.",
    "No account so good as.",
    "No advance without some risk.",
    "No all that glitters is.",
    "No answer is also answer.",
    "No apple far from tree.",
    "No benefit without corresponding cost.",
    "No best without a better.",
    "No better than you should.",
    "No big deal is this.",
    "No bird can fly with.",
    "No business like show business.",
    "No change without corresponding exchange.",
    "No child is an island.",
    "No collar is more expensive.",
    "No come no gain for.",
    "No comparison without similar pair.",
    "No contest is the outcome.",
    "No courage without fear at.",
    "No credit without debit first.",
    "No cross no crown ever.",
    "No deal is better than.",
    "No description without context is.",
    "No desire without corresponding fear.",
    "No development without progress in.",
    "No discord without concord for.",
    "No doubt about that one.",
    "No effect without corresponding cause.",
    "No effort without corresponding reward.",
    "No entry without exit ever.",
    "No escape is possible without.",
    "No exam without preparation for.",
    "No excuse without valid reason.",
    "No existence without corresponding non-existence.",
    "No expectation without corresponding disappointment.",
    "No experience without corresponding lesson.",
    "No explanation without context is.",
    "No export without corresponding import.",
    "No expression without corresponding impression.",
    "No fame without corresponding blame.",
    "No fear without corresponding courage.",
    "No fire without smoke at.",
    "No fish without bones in.",
    "No food for thought is.",
    "No fortune without corresponding misfortune.",
    "No free lunch in business.",
    "No gain without pain in.",
    "No glory without corresponding hardship.",
    "No good dead unpunished at.",
    "No great loss without some.",
    "No growth without corresponding effort.",
    "No habit without corresponding addiction.",
    "No happiness without corresponding sorrow.",
    "No harm done is good.",
    "No headline without story behind.",
    "No health without corresponding illness.",
    "No height without corresponding depth.",
    "No hope without despair at.",
    "No honor without corresponding sacrifice.",
    "No idea is completely original.",
    "No implication without corresponding inference.",
    "No improvement without corresponding change.",
    "No income without corresponding expense.",
    "No indication without corresponding sign.",
    "No innovation without risk taking.",
    "No input without output for.",
    "No interest without corresponding disinterest.",
    "No introduction without corresponding conclusion.",
    "No investigation without corresponding evidence.",
    "No joy without corresponding sorrow.",
    "No justice without corresponding law.",
    "No kidding without corresponding truth.",
    "No kindness without corresponding cruelty.",
    "No knowledge without corresponding ignorance.",
    "No landing without taking off.",
    "No language is without meaning.",
    "No law without corresponding penalty.",
    "No learning without corresponding teaching.",
    "No liberty without corresponding responsibility.",
    "No life without corresponding death.",
    "No light without corresponding darkness.",
    "No love without corresponding hatred.",
    "No luck without corresponding skill.",
    "No man is an island.",
    "No meaning without corresponding symbol.",
    "No medicine without corresponding side.",
    "No mercy without corresponding justice.",
    "No method without corresponding madness.",
    "No might without corresponding right.",
    "No milk without corresponding cow.",
    "No mission without corresponding vision.",
    "No money without corresponding value.",
    "No movement without corresponding stillness.",
    "No music without corresponding silence.",
    "No name is completely unique.",
    "No nation is an island.",
    "No news is good news.",
    "No noise without corresponding quiet.",
    "No nothing comes from nothing.",
    "No obligation without corresponding right.",
    "No occasion without corresponding crisis.",
    "No offense without corresponding defense.",
    "No oil without corresponding expense.",
    "No old without corresponding new.",
    "No omission without corresponding commission.",
    "No one can serve two.",
    "No one knows the future.",
    "No one makes a decision.",
    "No opportunity without corresponding risk.",
    "No option without corresponding cost.",
    "No order without corresponding chaos.",
    "No organization without corresponding system.",
    "No origin without corresponding destination.",
    "No outcome without corresponding process.",
    "No output without corresponding input.",
    "No pain no gain.",
    "No paper without corresponding pencil.",
    "No parent is perfect ever.",
    "No part without corresponding whole.",
    "No party without corresponding host.",
    "No patience without corresponding impatience.",
    "No pay without corresponding work.",
    "No peace without corresponding war.",
    "No penalty without corresponding crime.",
    "No philosophy without corresponding practice.",
    "No picture without corresponding frame.",
    "No plan without corresponding execution.",
    "No play without corresponding audience.",
    "No pleasure without corresponding pain.",
    "No policy without corresponding practice.",
    "No politics without corresponding compromise.",
    "No population without corresponding resources.",
    "No position without corresponding opposition.",
    "No positive without negative ever.",
    "No practice without corresponding theory.",
    "No praise without corresponding blame.",
    "No preparation without corresponding planning.",
    "No presence without corresponding absence.",
    "No price without corresponding value.",
    "No pride without corresponding shame.",
    "No principle without corresponding exception.",
    "No print without corresponding press.",
    "No problem without corresponding solution.",
    "No progress without corresponding change.",
    "No promise without corresponding fulfillment.",
    "No property without corresponding obligation.",
    "No proportion without corresponding ratio.",
    "No protection without corresponding vulnerability.",
    "No protest without corresponding support.",
    "No provision without corresponding requirement.",
    "No psychology without corresponding behavior.",
    "No purchase without corresponding payment.",
    "No purity without corresponding impurity.",
    "No purpose without corresponding meaning.",
    "No pursuit without corresponding avoidance.",
    "No quality without corresponding quantity.",
    "No question without corresponding answer.",
    "No quota without corresponding limit.",
    "No race without corresponding finish.",
    "No rank without corresponding file.",
    "No reaction without corresponding action.",
    "No reality without corresponding perception.",
    "No reason without corresponding cause.",
    "No reception without corresponding transmission.",
    "No recognition without corresponding identity.",
    "No record without corresponding memory.",
    "No recovery without corresponding loss.",
    "No reduction without corresponding oxidation.",
    "No reference without corresponding citation.",
    "No reform without corresponding revolution.",
    "No registration without corresponding identification.",
    "No regulation without corresponding compliance.",
    "No reinforcement without corresponding weakening.",
    "No rejection without corresponding acceptance.",
    "No relation without corresponding connection.",
    "No relationship without corresponding boundary.",
    "No relaxation without corresponding tension.",
    "No release without corresponding capture.",
    "No relevance without corresponding context.",
    "No relief without corresponding distress.",
    "No religion without corresponding morality.",
    "No repair without corresponding damage.",
    "No repetition without corresponding variation.",
    "No report without corresponding account.",
    "No representation without corresponding misrepresentation.",
    "No reputation without corresponding character.",
    "No request without corresponding response.",
    "No research without corresponding methodology.",
    "No reservation without corresponding cancellation.",
    "No resistance without corresponding submission.",
    "No resolution without corresponding decision.",
    "No resource without corresponding scarcity.",
    "No response without corresponding stimulus.",
    "No responsibility without corresponding authority.",
    "No rest without corresponding labor.",
    "No restriction without corresponding freedom.",
    "No result without corresponding cause.",
    "No retention without corresponding loss.",
    "No return without corresponding investment.",
    "No revelation without corresponding concealment.",
    "No revenue without corresponding expense.",
    "No review without corresponding preview.",
    "No revision without corresponding submission.",
    "No reward without corresponding effort.",
    "No rhythm without corresponding beat.",
    "No rise without corresponding fall.",
    "No risk without corresponding reward.",
    "No rule without corresponding exception.",
    "No safety without corresponding danger.",
    "No sale without corresponding purchase.",
    "No salvation without corresponding damnation.",
    "No satisfaction without corresponding desire.",
    "No science without corresponding hypothesis.",
    "No score without corresponding point.",
    "No screen without corresponding stage.",
    "No script without corresponding actor.",
    "No sculpture without corresponding chisel.",
    "No search without corresponding find.",
    "No season without corresponding change.",
    "No security without corresponding vulnerability.",
    "No selection without corresponding rejection.",
    "No self without corresponding other.",
    "No seminar without corresponding discussion.",
    "No sensation without corresponding stimulus.",
    "No sense without corresponding nonsense.",
    "No sentence without corresponding word.",
    "No separation without corresponding union.",
    "No sequence without corresponding order.",
    "No service without corresponding customer.",
    "No settlement without corresponding dispute.",
    "No sex without corresponding gender.",
    "No shade without corresponding light.",
    "No shadow without corresponding sun.",
    "No shape without corresponding void.",
    "No ship without corresponding harbor.",
    "No shock without corresponding defense.",
    "No sign without corresponding symbol.",
    "No signal without corresponding noise.",
    "No silence without corresponding sound.",
    "No similarity without corresponding difference.",
    "No simulation without corresponding reality.",
    "No skill without corresponding practice.",
    "No skin without corresponding bone.",
    "No sleep without corresponding wake.",
    "No slogan without corresponding meaning.",
    "No solution without corresponding problem.",
    "No sorrow without corresponding joy.",
    "No sound without corresponding silence.",
    "No source without corresponding destination.",
    "No space without corresponding time.",
    "No spark without corresponding flame.",
    "No speaker without corresponding listener.",
    "No speech without corresponding audience.",
    "No speed without corresponding slowness.",
    "No spending without corresponding saving.",
    "No spirit without corresponding body.",
    "No sport without corresponding play.",
    "No spot without corresponding location.",
    "No staff without corresponding leader.",
    "No stage without corresponding performer.",
    "No statement without corresponding question.",
    "No station without corresponding journey.",
    "No statue without corresponding sculptor.",
    "No stimulus without corresponding response.",
    "No stock without corresponding dividend.",
    "No storage without corresponding retrieval.",
    "No storm without corresponding calm.",
    "No story without corresponding plot.",
    "No strategy without corresponding tactic.",
    "No strength without corresponding weakness.",
    "No stress without corresponding strain.",
    "No structure without corresponding function.",
    "No style without corresponding substance.",
    "No subject without corresponding object.",
    "No substance without corresponding form.",
    "No success without corresponding failure.",
    "No summary without corresponding detail.",
    "No sun without corresponding shadow.",
    "No supply without corresponding demand.",
    "No support without corresponding opposition.",
    "No surface without corresponding depth.",
    "No surgery without corresponding recovery.",
    "No surprise without corresponding expectation.",
    "No surrender without corresponding conquest.",
    "No survival without corresponding adaptation.",
    "No suspicion without corresponding evidence.",
    "No sweetness without corresponding bitterness.",
    "No symbol without corresponding meaning.",
    "No symmetry without corresponding asymmetry.",
    "No system without corresponding subsystem.",
    "No table without corresponding chair.",
    "No talent without corresponding skill.",
    "No task without corresponding execution.",
    "No taste without corresponding flavor.",
    "No tax without corresponding representation.",
    "No teacher without corresponding student.",
    "No technique without corresponding practice.",
    "No technology without corresponding application.",
    "No tension without corresponding relaxation.",
    "No territory without corresponding border.",
    "No test without corresponding evaluation.",
    "No text without corresponding context.",
    "No texture without corresponding surface.",
    "No theory without corresponding evidence.",
    "No therapy without corresponding diagnosis.",
    "No thing without corresponding name.",
    "No thought without corresponding action.",
    "No threat without corresponding response.",
    "No time without corresponding space.",
    "No title without corresponding holder.",
    "No today without corresponding tomorrow.",
    "No tolerance without corresponding acceptance.",
    "No tool without corresponding purpose.",
    "No topic without corresponding discussion.",
    "No tradition without corresponding innovation.",
    "No training without corresponding practice.",
    "No trait without corresponding behavior.",
    "No transfer without corresponding reception.",
    "No transformation without corresponding change.",
    "No transit without corresponding destination.",
    "No translation without corresponding interpretation.",
    "No travel without corresponding journey.",
    "No treatment without corresponding diagnosis.",
    "No trend without corresponding pattern.",
    "No trial without corresponding error.",
    "No trick without corresponding treat.",
    "No trouble without corresponding solution.",
    "No trust without corresponding betrayal.",
    "No truth without corresponding lie.",
    "No type without corresponding classification.",
    "No understanding without corresponding confusion.",
    "No unit without corresponding measurement.",
    "No unity without corresponding diversity.",
    "No use without corresponding user.",
    "No vacation without corresponding work.",
    "No validity without corresponding evidence.",
    "No value without corresponding cost.",
    "No variation without corresponding constant.",
    "No victory without corresponding defeat.",
    "No view without corresponding perspective.",
    "No virtue without corresponding vice.",
    "No vision without corresponding mission.",
    "No volume without corresponding density.",
    "No vote without corresponding choice.",
    "No voyage without corresponding destination.",
    "No wage without corresponding labor.",
    "No warning without corresponding alarm.",
    "No wealth without corresponding poverty.",
    "No weapon without corresponding target.",
    "No weather without corresponding climate.",
    "No week without corresponding weekend.",
    "No weight without corresponding mass.",
    "No welfare without corresponding responsibility.",
    "No win without corresponding loss.",
    "No wisdom without corresponding experience.",
    "No wish without corresponding hope.",
    "No witness without corresponding testimony.",
    "No word without corresponding definition.",
    "No work without corresponding effort.",
    "No worry without corresponding concern.",
    "No worship without corresponding sacrifice.",
    "No worth without corresponding value.",
    "No wound without corresponding healing.",
    "No writer without corresponding reader.",
    "No year without corresponding season.",
    "No yield without corresponding harvest.",
    "No zone without corresponding boundary.",
];

const STORAGE_KEY_WPM = "island-typing-highscore-wpm";
const STORAGE_KEY_ACC = "island-typing-highscore-acc";
const STORAGE_KEY_TOTAL = "island-typing-total-chars";

interface HighScores {
    wpm: number;
    accuracy: number;
    totalChars: number;
}

const getHighScores = (): HighScores => {
    if (typeof window === "undefined") return { wpm: 0, accuracy: 0, totalChars: 0 };
    return {
        wpm: parseInt(localStorage.getItem(STORAGE_KEY_WPM) || "0", 10),
        accuracy: parseInt(localStorage.getItem(STORAGE_KEY_ACC) || "0", 10),
        totalChars: parseInt(localStorage.getItem(STORAGE_KEY_TOTAL) || "0", 10),
    };
};

const setHighScores = (wpm: number, accuracy: number, totalChars: number) => {
    if (typeof window === "undefined") return;
    const current = getHighScores();
    if (wpm > current.wpm) {
        localStorage.setItem(STORAGE_KEY_WPM, wpm.toString());
    }
    if (accuracy > current.accuracy) {
        localStorage.setItem(STORAGE_KEY_ACC, accuracy.toString());
    }
    const newTotal = current.totalChars + totalChars;
    localStorage.setItem(STORAGE_KEY_TOTAL, newTotal.toString());
};

let lastSentenceIndex = -1;

const getRandomSentence = (): string => {
    let index;
    do {
        index = Math.floor(Math.random() * SENTENCES.length);
    } while (index === lastSentenceIndex && SENTENCES.length > 1);
    lastSentenceIndex = index;
    return SENTENCES[index];
};

export default function TypingGame() {
    const [gameState, setGameState] = useState<GameState>("menu");
    const [gameMode, setGameMode] = useState<GameMode>("timed");
    const [timeLimit, setTimeLimit] = useState<30 | 60>(60);
    const [sentence, setSentence] = useState("");
    const [userInput, setUserInput] = useState("");
    const [timeLeft, setTimeLeft] = useState(60);
    const [hasStarted, setHasStarted] = useState(false);
    const [charStates, setCharStates] = useState<("correct" | "wrong" | "current" | "pending")[]>([]);
    const [highScores, setHighScoresState] = useState<HighScores>({ wpm: 0, accuracy: 0, totalChars: 0 });
    const [totalCharsTyped, setTotalCharsTyped] = useState(0);
    const [sessionCharsTyped, setSessionCharsTyped] = useState(0);

    const inputRef = useRef<HTMLTextAreaElement>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const startTimeRef = useRef<number | null>(null);
    const isTransitioningRef = useRef(false);
    const sentenceRef = useRef("");
    const endGameRef = useRef<() => void>(() => {});

    useEffect(() => {
        setHighScoresState(getHighScores());
    }, []);

    const calculateWPM = useCallback((charsTyped: number, timeMs: number): number => {
        if (timeMs <= 0) return 0;
        const minutes = timeMs / 60000;
        const words = charsTyped / 5;
        return Math.round(words / minutes);
    }, []);

    const calculateAccuracy = useCallback((correct: number, total: number): number => {
        if (total === 0) return 100;
        return Math.round((correct / total) * 100);
    }, []);

    const startTimer = useCallback(() => {
        if (timerRef.current) return;
        
        startTimeRef.current = Date.now();
        setHasStarted(true);

        timerRef.current = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    if (timerRef.current) {
                        clearInterval(timerRef.current);
                        timerRef.current = null;
                    }
                    setTimeout(() => {
                        endGameRef.current();
                    }, 0);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
    }, []);

    const endGame = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }

        const endTime = Date.now();
        const timeMs = startTimeRef.current ? endTime - startTimeRef.current : 0;
        const wpm = calculateWPM(sessionCharsTyped, timeMs);
        const accuracy = calculateAccuracy(sessionCharsTyped, totalCharsTyped);

        setHighScores(wpm, accuracy, sessionCharsTyped);
        setHighScoresState(getHighScores());
        setGameState("gameover");
    }, [sessionCharsTyped, totalCharsTyped, calculateWPM, calculateAccuracy]);

    useEffect(() => {
        endGameRef.current = endGame;
    }, [endGame]);

    const loadNextSentence = useCallback((isComplete: boolean = false) => {
        if (isTransitioningRef.current) return;
        isTransitioningRef.current = true;

        if (isComplete) {
            const charsCompleted = sentenceRef.current.length;
            setSessionCharsTyped((prev) => prev + charsCompleted);
        }

        const nextSentence = getRandomSentence();
        sentenceRef.current = nextSentence;
        setSentence(nextSentence);
        setUserInput("");
        setCharStates(nextSentence.split("").map((_, i) => i === 0 ? "current" : "pending"));

        setTimeout(() => {
            isTransitioningRef.current = false;
            inputRef.current?.focus();
        }, 50);
    }, []);

    const goToMenu = useCallback(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        startTimeRef.current = null;
        setHasStarted(false);
        setGameState("menu");
        setUserInput("");
        setSentence("");
        setCharStates([]);
        setSessionCharsTyped(0);
    }, []);

    const startGame = useCallback((mode: GameMode, time: 30 | 60) => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
        
        startTimeRef.current = null;
        setHasStarted(false);
        setTimeLeft(time);
        setGameMode(mode);
        setTimeLimit(time);
        setSessionCharsTyped(0);
        setTotalCharsTyped(0);
        
        const firstSentence = getRandomSentence();
        sentenceRef.current = firstSentence;
        setSentence(firstSentence);
        setUserInput("");
        setCharStates(firstSentence.split("").map((_, i) => i === 0 ? "current" : "pending"));
        setGameState("playing");

        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    }, []);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (gameState !== "playing" || isTransitioningRef.current) return;

        const value = e.target.value;
        const currentSentence = sentenceRef.current;

        if (!hasStarted && value.length > 0) {
            startTimer();
        }

        if (gameMode === "timed" && timeLeft <= 0) return;

        const newCharStates = currentSentence.split("").map((char, i) => {
            if (i >= value.length) {
                return i === value.length ? "current" : "pending";
            }
            return value[i] === char ? "correct" : "wrong";
        });

        setUserInput(value);
        setCharStates(newCharStates);
        setTotalCharsTyped((prev) => prev + 1);

        if (value === currentSentence) {
            loadNextSentence(true);
        }
    }, [gameState, hasStarted, gameMode, timeLeft, startTimer, loadNextSentence]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Tab") {
            e.preventDefault();
        }
    }, []);

    const getFinalStats = useCallback(() => {
        const endTime = Date.now();
        const timeMs = startTimeRef.current ? endTime - startTimeRef.current : 0;
        const wpm = calculateWPM(sessionCharsTyped, timeMs);
        const accuracy = calculateAccuracy(sessionCharsTyped, totalCharsTyped);
        return { wpm, accuracy, totalChars: sessionCharsTyped };
    }, [sessionCharsTyped, totalCharsTyped, calculateWPM, calculateAccuracy]);

    const getCurrentWPM = useCallback(() => {
        if (!startTimeRef.current || sessionCharsTyped === 0) return 0;
        const timeMs = Date.now() - startTimeRef.current;
        return calculateWPM(sessionCharsTyped, timeMs);
    }, [sessionCharsTyped, calculateWPM]);

    const getCurrentAccuracy = useCallback(() => {
        return calculateAccuracy(sessionCharsTyped, totalCharsTyped);
    }, [sessionCharsTyped, totalCharsTyped, calculateAccuracy]);

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    return (
        <div className="bg-[var(--bg-primary)] py-4 px-4">
            <div className="max-w-3xl mx-auto">
                {/* <AdBanner className="mb-8" /> */}

                <div className="bg-[var(--bg-secondary)] rounded-2xl p-8 shadow-lg">
                    {gameState === "menu" && (
                        <div className="text-center">
                            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[var(--accent-green)]/20 flex items-center justify-center">
                                <Keyboard className="w-10 h-10 text-[var(--accent-green)]" />
                            </div>
                            <h1 className="text-3xl font-bold text-[var(--heading-text)] mb-4">
                                Typing Speed Challenge
                            </h1>
                            <p className="text-[var(--paragraph-text)] mb-8">
                                Test your typing speed and accuracy. Choose a mode to begin!
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm text-[var(--text-secondary)] mb-3 font-medium">Select Mode</p>
                                    <div className="flex justify-center gap-3">
                                        <button
                                            onClick={() => setGameMode("timed")}
                                            className={`px-6 py-3 rounded-xl font-medium transition-all ${
                                                gameMode === "timed"
                                                    ? "bg-[var(--accent-green)] text-white"
                                                    : "bg-[var(--bg-primary)] text-[var(--paragraph-text)] hover:bg-[var(--border-color)]"
                                            }`}
                                        >
                                            <Clock className="w-4 h-4 inline mr-2" />
                                            Timed Mode
                                        </button>
                                        <button
                                            onClick={() => setGameMode("fulltext")}
                                            className={`px-6 py-3 rounded-xl font-medium transition-all ${
                                                gameMode === "fulltext"
                                                    ? "bg-[var(--accent-green)] text-white"
                                                    : "bg-[var(--bg-primary)] text-[var(--paragraph-text)] hover:bg-[var(--border-color)]"
                                            }`}
                                        >
                                            <Target className="w-4 h-4 inline mr-2" />
                                            Full Text Mode
                                        </button>
                                    </div>
                                </div>

                                {gameMode === "timed" && (
                                    <div>
                                        <p className="text-sm text-[var(--text-secondary)] mb-3 font-medium">Select Duration</p>
                                        <div className="flex justify-center gap-3">
                                            <button
                                                onClick={() => setTimeLimit(30)}
                                                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                                                    timeLimit === 30
                                                        ? "bg-[var(--accent-green)] text-white"
                                                        : "bg-[var(--bg-primary)] text-[var(--paragraph-text)] hover:bg-[var(--border-color)]"
                                                }`}
                                            >
                                                30 seconds
                                            </button>
                                            <button
                                                onClick={() => setTimeLimit(60)}
                                                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                                                    timeLimit === 60
                                                        ? "bg-[var(--accent-green)] text-white"
                                                        : "bg-[var(--bg-primary)] text-[var(--paragraph-text)] hover:bg-[var(--border-color)]"
                                                }`}
                                            >
                                                60 seconds
                                            </button>
                                        </div>
                                    </div>
                                )}

                                <button
                                    onClick={() => startGame(gameMode, timeLimit)}
                                    className="w-full py-4 px-8 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold text-lg shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <Play className="w-5 h-5" />
                                    Start Game
                                </button>

                                {(highScores.wpm > 0 || highScores.accuracy > 0) && (
                                    <div className="pt-4 border-t border-[var(--border-color)]">
                                        <p className="text-xs text-[var(--text-secondary)] mb-3 uppercase tracking-wider">Your Records</p>
                                        <div className="flex justify-center gap-8 text-sm">
                                            <div className="flex items-center gap-2">
                                                <Trophy className="w-4 h-4 text-yellow-500" />
                                                <span className="text-[var(--paragraph-text)]">Best WPM: <strong className="text-[var(--heading-text)]">{highScores.wpm}</strong></span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Target className="w-4 h-4 text-blue-500" />
                                                <span className="text-[var(--paragraph-text)]">Best Accuracy: <strong className="text-[var(--heading-text)]">{highScores.accuracy}%</strong></span>
                                            </div>
                                        </div>
                                        <p className="mt-2 text-xs text-[var(--text-secondary)]">
                                            Total characters typed: <strong>{highScores.totalChars.toLocaleString()}</strong>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {gameState === "playing" && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-[var(--text-secondary)]" />
                                        <span className={`text-lg font-semibold ${timeLeft <= 10 ? "text-red-500" : "text-[var(--heading-text)]"}`}>
                                            {timeLeft}s
                                        </span>
                                    </div>
                                    <button
                                        onClick={goToMenu}
                                        className="p-2 text-[var(--text-secondary)] hover:text-[var(--heading-text)] hover:bg-[var(--bg-primary)] rounded-lg transition-colors"
                                        title="Back to Menu"
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-[var(--accent-green)]" />
                                        <span className="font-semibold text-[var(--heading-text)]">
                                            {getCurrentWPM()} WPM
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Target className="w-5 h-5 text-blue-500" />
                                        <span className="font-semibold text-[var(--heading-text)]">
                                            {getCurrentAccuracy()}%
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div
                                ref={containerRef}
                                className="mb-6 p-6 bg-[var(--bg-primary)] rounded-xl text-xl leading-relaxed tracking-wide"
                            >
                                {charStates.map((state, i) => (
                                    <span
                                        key={i}
                                        className={`transition-colors duration-75 ${
                                            state === "correct" ? "text-[var(--accent-green)]" :
                                            state === "wrong" ? "text-red-500 bg-red-500/20" :
                                            state === "current" ? "bg-[var(--accent-green)]/30 border-b-2 border-[var(--accent-green)]" :
                                            "text-[var(--text-secondary)]"
                                        }`}
                                    >
                                        {sentence[i]}
                                    </span>
                                ))}
                            </div>

                            <textarea
                                ref={inputRef}
                                value={userInput}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Start typing..."
                                disabled={timeLeft <= 0}
                                className="w-full h-32 p-4 bg-[var(--bg-primary)] border-2 border-[var(--border-color)] rounded-xl text-lg focus:border-[var(--accent-green)] focus:outline-none resize-none transition-colors"
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="off"
                                spellCheck="false"
                            />

                            <div className="mt-4 flex justify-center">
                                <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                                    <BookOpen className="w-4 h-4" />
                                    <span>Type the sentence above as fast as you can!</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {gameState === "gameover" && (
                        <GameResultLayout
                            score={getFinalStats().wpm}
                            highScore={highScores.wpm}
                            onRestart={() => startGame(gameMode, timeLimit)}
                            title="Time's Up!"
                            subtitle="Here's how you performed:"
                            icon={<Trophy className="w-10 h-10 text-yellow-500" />}
                            iconBgColor="bg-[var(--accent-green)]/20"
                            customContent={
                                <div className="bg-[var(--bg-primary)] rounded-xl p-4 mb-4">
                                    <div className="grid grid-cols-3 gap-3">
                                        <div>
                                            <p className="text-xs text-[var(--text-secondary)] mb-1">Speed</p>
                                            <p className="text-2xl font-bold text-[var(--accent-green)] flex items-center justify-center gap-1">
                                                <Zap className="w-4 h-4" />
                                                {getFinalStats().wpm}
                                            </p>
                                            <p className="text-xs text-[var(--text-secondary)]">WPM</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-[var(--text-secondary)] mb-1">Accuracy</p>
                                            <p className="text-2xl font-bold text-blue-500 flex items-center justify-center gap-1">
                                                <Target className="w-4 h-4" />
                                                {getFinalStats().accuracy}
                                            </p>
                                            <p className="text-xs text-[var(--text-secondary)]">%</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-[var(--text-secondary)] mb-1">Characters</p>
                                            <p className="text-2xl font-bold text-purple-500 flex items-center justify-center gap-1">
                                                <BookOpen className="w-4 h-4" />
                                                {getFinalStats().totalChars}
                                            </p>
                                            <p className="text-xs text-[var(--text-secondary)]">typed</p>
                                        </div>
                                    </div>

                                    {(getFinalStats().wpm >= highScores.wpm && getFinalStats().wpm > 0) && (
                                        <p className="mt-3 text-sm text-[var(--accent-green)] font-semibold">
                                            New High Score!
                                        </p>
                                    )}
                                </div>
                            }
                        >
                            <button
                                onClick={goToMenu}
                                className="w-full py-2 px-6 bg-[var(--bg-primary)] text-[var(--paragraph-text)] rounded-full font-medium hover:bg-[var(--border-color)] transition-all flex items-center justify-center gap-2 text-sm"
                            >
                                <ChevronLeft className="w-4 h-4" />
                                Back to Menu
                            </button>
                        </GameResultLayout>
                    )}
                </div>
            </div>
        </div>
    );
}
