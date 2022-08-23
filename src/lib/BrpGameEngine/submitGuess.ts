import english from '../../dictionaries/english';
import Brp from './Brp';
import BrpGameState from './BrpGameState';
import Brps from './Brps';
import calculatePoints from './calculatePoints';

export default function submitGuess({
    gameMode, brp, answers, points, lastGuess, guesses, counter, finished
}: BrpGameState): BrpGameState {
    const newState: BrpGameState = {
        gameMode, brp, answers, points, lastGuess, guesses, counter, finished
    };

    // Check you used enough the letters
    if (!newState.lastGuess || newState.lastGuess.length < 3) {
        newState.lastGuessOk = false;
        newState.lastGuessMessages = ['Not enough letters'];
        return newState;
    }

    // Check you haven't already guessed this
    if (gameMode === 'brp' && newState.answers.some((a) => a.word === newState.lastGuess)) {
        newState.lastGuessOk = false;
        newState.lastGuessMessages = [`You already used ${newState.lastGuess}`];
        return newState;
    }

    // Check all the letters are used
    const _1 = newState.brp[0];
    let count1 = 1;

    const _2 = newState.brp[1];
    let count2 = 1;

    const _3 = newState.brp[2];
    let count3 = 1;

    if (_1 === _2) { count1++; count2++; }
    if (_1 === _3) { count1++; count3++; }
    if (_2 === _3) { count2++; count3++; }

    // Count the instances of the selected letters.
    const letters = newState.lastGuess.split('');
    const found1 = letters.filter((x) => x === _1).length;
    const found2 = letters.filter((x) => x === _2).length;
    const found3 = letters.filter((x) => x === _3).length;

    // set the message if there is one.
    const messages = [] as Array<string>;
    if (found1 < count1) {
        if (found1 > 0) messages.push(`"${_1}" does not appear enough times in this word.`);
        else messages.push(`"${_1}" does not appear at all in this word.`);
    }
    if (_2 !== _1 && found2 < count2) {
        if (found2 > 0) messages.push(`"${_2}" does not appear enough times in this word.`);
        else messages.push(`"${_2}" does not appear at all in this word.`);
    }
    if (_3 !== _1 && _3 !== _2 && found3 < count3) {
        if (found3 > 0) messages.push(`"${_3}" does not appear enough times in this word.`);
        else messages.push(`"${_3}" does not appear at all in this word.`);
    }

    // Check the message and return the new state if there is one.
    if (messages.length) {
        newState.lastGuessOk = false;
        newState.lastGuessMessages = messages;
        return newState;
    }

    // Check it's a real word.
    if (english.indexOf(newState.lastGuess.toLocaleLowerCase()) === -1) {
        newState.lastGuessMessages = [`${newState.lastGuess} is not in the word list`];
        newState.lastGuessOk = false;
        return newState;
    }

    const pointsEarned = calculatePoints(newState.lastGuess, brp);
    newState.points += pointsEarned;
    newState.answers.unshift({ word: newState.lastGuess, brp: newState.brp, points: pointsEarned });
    newState.lastGuess = undefined;
    newState.lastGuessOk = true;
    newState.lastGuessMessages = undefined;

    if (newState.gameMode === 'brp') {
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
