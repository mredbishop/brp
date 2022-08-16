import english from '../../dictionaries/english';
import Brp from './Brp';
import BrpGameState from './BrpGameState';
import BrpLetter, { brpLetters } from './BrpLetter';
import Brps from './Brps';
import { GameMode } from './GameMode';

export default class BrpGameEngine {
    public static startGame({ gameMode }: { gameMode: GameMode }) {
        const index = Math.ceil(Math.random() * 2000);
        const brp = Brps.all[index][0];

        const state: BrpGameState = {
            gameMode, brp, answers: [], points: 0, guesses: 0, counter: 42, finished: false
        };

        return state;
    }

    public static submitGuess({
        gameMode, brp, answers, points, lastGuess, guesses, counter, finished
    }: BrpGameState): BrpGameState {
        const newState: BrpGameState = {
            gameMode, brp, answers, points, lastGuess, guesses, counter, finished
        };

        // Check you used enough the letters
        if (!newState.lastGuess || newState.lastGuess.length < 3) {
            newState.lastGuessOk = false;
            newState.lastGuessMessage = 'Not enough letters';
            return newState;
        }

        // Check you haven't already guessed this
        if (gameMode === 'brp' && newState.answers.some((a) => a.word === newState.lastGuess)) {
            newState.lastGuessOk = false;
            newState.lastGuessMessage = `You already used ${newState.lastGuess}`;
            return newState;
        }

        // TODO: Rewrite this section so that each letter is used up in case of two (or three) of the same.
        // Check all the letters are used
        let message: string | undefined;
        const has1 = newState.lastGuess.indexOf(newState.brp[0]) > -1;
        const has2 = newState.lastGuess.indexOf(newState.brp[1]) > -1;
        const has3 = newState.lastGuess.indexOf(newState.brp[2]) > -1;
        // Check you used the right letters
        if (!has1 && has2 && has3) message = `${newState.brp[0]} was not used`;
        else if (has1 && !has2 && has3) message = `${newState.brp[1]} was not used`;
        else if (has1 && has2 && !has3) message = `${newState.brp[2]} was not used`;
        else if (!has1 && !has2 && has3) message = `${newState.brp[0]} and ${newState.brp[1]} were not used`;
        else if (!has1 && has2 && !has3) message = `${newState.brp[0]} and ${newState.brp[2]} were not used`;
        else if (has1 && !has2 && !has3) message = `${newState.brp[1]} and ${newState.brp[2]} were not used`;
        else if (!has1 && !has2 && !has3) message = `${newState.brp[0]}, ${newState.brp[1]} and ${newState.brp[2]} were not used`;

        if (message) {
            newState.lastGuessOk = false;
            newState.lastGuessMessage = message;
            return newState;
        }

        // Check it's a real word.
        if (english.indexOf(newState.lastGuess.toLocaleLowerCase()) === -1) {
            newState.lastGuessMessage = `${newState.lastGuess} is not in the word list`;
            newState.lastGuessOk = false;
            return newState;
        }

        const pointsEarned = BrpGameEngine.calculatePoints(newState.lastGuess, brp);
        newState.points += pointsEarned;
        newState.answers.unshift({ word: newState.lastGuess, brp: newState.brp, points: pointsEarned });
        newState.lastGuess = undefined;
        newState.lastGuessOk = true;
        newState.lastGuessMessage = undefined;

        if (newState.gameMode === 'flo') {
            newState.counter--;
            let newBrp: Brp;
            do {
                const index = Math.ceil(Math.random() * 2000);
                [newBrp] = Brps.all[index];
            } while (newBrp === newState.brp);

            newState.brp = newBrp;
            if (counter <= 0) {
                newState.finished = true;
            }
        }

        return newState;
    }

    private static calculatePoints(guess: string, brp: Brp) {
        if (!guess) return 0;

        let multiplier = 1;
        // Starts and ends with the first and last brp letter +1
        if (guess.startsWith(brp[0]) && guess.endsWith(brp[2])) multiplier++;

        // Has the middle brp letter as it's middle letter.
        if (guess.indexOf(brp[1]) === ((guess.length / 2) - 0.5)) multiplier++;

        let points = 0;
        guess.split('').forEach((letter) => {
            points += brpLetters[letter as BrpLetter];
        });

        return points * multiplier;
    }
}
