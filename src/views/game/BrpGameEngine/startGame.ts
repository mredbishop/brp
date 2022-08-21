import BrpGameState from '../BrpGameState';
import Brps from '../Brps';
import GameMode from '../GameMode';

export default function startGame({ gameMode }: { gameMode: GameMode; }) {
    const index = Math.ceil(Math.random() * 2000);
    const brp = Brps.all[index][0];

    const state: BrpGameState = {
        gameMode, brp, answers: [], points: 0, guesses: 0, counter: 10, finished: false
    };

    return state;
}
