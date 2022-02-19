import log from '../../../Logger';
import Brp from '../Brp';
import BrpGame from '../BrpGame';

const Flo = () => {
    const nextBrp = (brp: Brp, lastWord: string): Brp => {
        log('nextBrp', { brp, lastWord });
        return ['B', 'R', 'P'];
    };
    return <BrpGame gameMode="flo" background="secondaryBackground" />;
};
export default Flo;
