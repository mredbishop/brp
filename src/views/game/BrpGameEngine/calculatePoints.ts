import Brp from '../Brp';
import BrpLetter, { brpLetters } from '../BrpLetter';

export default function calculatePoints(guess: string, brp: Brp) {
    if (!guess) { return 0; }

    let multiplier = 1;
    // Starts and ends with the first and last brp letter +1
    if (guess.startsWith(brp[0]) && guess.endsWith(brp[2])) { multiplier++; }

    // Has the middle brp letter as it's middle letter.
    if (guess.indexOf(brp[1]) === ((guess.length / 2) - 0.5)) { multiplier++; }

    let points = 0;
    guess.split('').forEach((letter) => {
        points += brpLetters[letter as BrpLetter];
    });

    return points * multiplier;
}
