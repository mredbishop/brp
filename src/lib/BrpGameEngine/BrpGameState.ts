import Brp from './Brp';
import GameMode from './GameMode';

type BrpGameState = {
    finalScore?: [number, number, number];
    gameMode: GameMode;
    brp: Brp;
    answers: Array<{ word: string, brp: Brp, points: number }>;
    points: number;
    lastGuess?: string;
    lastGuessOk?: boolean;
    lastGuessMessages?: Array<string>;
    guesses: number;
    counter: number;
    finished: boolean;
}

export default BrpGameState;
