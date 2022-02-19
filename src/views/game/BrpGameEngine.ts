import english from '../../dictionaries/english';
import Brp from './Brp';
import BrpLetter, { brpLetters } from './BrpLetter';
import { GameMode } from './GameMode';

export default class BrpGameEngine {
    private _brp: Brp;

    points = 0;

    public get brp() {
        return this._brp;
    }

    private answers: Array<{ word: string, brp: Brp, points: number }> = [];

    public guess?: string;

    public readonly gameMode: string;

    constructor({ gameMode, maxLevel }: { gameMode: GameMode, maxLevel: number }) {
        this.gameMode = gameMode;
        const randomLetter = (level = 10) => {
            const letters = level >= 10
                ? Object.keys(brpLetters) as Array<BrpLetter>
                : (Object.keys(brpLetters) as Array<BrpLetter>)
                    .map((letter) => ({ letter, score: brpLetters[letter as BrpLetter] }))
                    .filter((letterScore) => letterScore.score <= level)
                    .map((letterScore) => letterScore.letter);
            return letters[Math.floor(Math.random() * letters.length)];
        };
        this._brp = [randomLetter(maxLevel), randomLetter(maxLevel), randomLetter(maxLevel)];
    }

    public nextBrp?: () => Brp;

    public submitGuess(): { ok: false, clear: boolean, message: string } | { ok: true, points: number } {
        const ok = false;
        const clear = true;
        // Check you used enough the letters
        if (!this.guess || this.guess.length < 3) return { ok, clear, message: 'Not enough letters' };

        if (this.answers.some((a) => a.word === this.guess)) return { ok, clear, message: `You already used ${this.guess}` };

        const has1 = this.guess.indexOf(this._brp[0]) > -1;
        const has2 = this.guess.indexOf(this._brp[1]) > -1;
        const has3 = this.guess.indexOf(this._brp[2]) > -1;
        // Check you used the right letters
        if (!has1 && has2 && has3) return { ok, clear, message: `${this._brp[0]} was not used` };
        if (has1 && !has2 && has3) return { ok, clear, message: `${this._brp[1]} was not used` };
        if (has1 && has2 && !has3) return { ok, clear, message: `${this._brp[2]} was not used` };
        if (!has1 && !has2 && has3) return { ok, clear, message: `${this._brp[0]} and ${this._brp[1]} were not used` };
        if (!has1 && has2 && !has3) return { ok, clear, message: `${this._brp[0]} and ${this._brp[2]} were not used` };
        if (has1 && !has2 && !has3) return { ok, clear, message: `${this._brp[1]} and ${this._brp[2]} were not used` };
        if (!has1 && !has2 && !has3) return { ok, clear, message: `${this._brp[0]}, ${this._brp[1]} and ${this._brp[2]} were not used` };

        // Check it's a real word.
        if (english.indexOf(this.guess.toLocaleLowerCase()) === -1) return { ok, clear, message: `${this.guess} is not in the word list` };

        const points = this.calculatePoints();

        this.points += points;

        this.answers.push({ word: this.guess, brp: this._brp, points });
        this.guess = undefined;

        return { ok: true, points };
    }

    private calculatePoints() {
        if (!this.guess) return 0;

        let multiplier = 1;
        // Starts and ends with the first and last brp letter +1
        if (this.guess.startsWith(this._brp[0]) && this.guess.endsWith(this._brp[2])) multiplier++;

        // Has the middle brp letter as it's middle letter.
        if (this.guess.indexOf(this._brp[1]) === ((this.guess.length / 2) - 0.5)) multiplier++;

        let points = 0;
        this.guess.split('').forEach((letter) => {
            points += brpLetters[letter as BrpLetter];
        });

        return points * multiplier;
    }
}
