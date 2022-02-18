import log from '../../../Logger';
import Brp from '../Brp';
import BrpGame from '../BrpGame';

const Flo = () => {
    const nextBrp = (brp: Brp, lastWord: string): Brp => {
        log('nextBrp', { brp, lastWord });
        return ['B', 'R', 'P'];
    };
    return <BrpGame brp={['F', 'L', 'O']} background="secondaryBackground" nextBrp={nextBrp} />;
};
export default Flo;
