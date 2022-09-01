import Brp from '../Brp';
import BrpGameState from '../BrpGameState';
import Brps from '../Brps';

const brp = (state: BrpGameState): BrpGameState => {
    const newState = { ...state };
    newState.counter--;
    let newBrp: Brp;
    do {
        const index = Math.ceil(Math.random() * 2000);
        [newBrp] = Brps.all[index];
    } while (newBrp === newState.brp);

    newState.brp = newBrp;
    if (newState.counter <= 0) {
        newState.finished = true;
    }

    return newState;
};

export default brp;
