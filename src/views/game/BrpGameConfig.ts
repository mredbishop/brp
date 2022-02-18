import theme from '../../Theme';
import Brp from './Brp';

type nextBrp = (lastBrp: Brp, lastWord: string) => Brp;
type BrpGameConfig = {
    brp: Brp,
    background: keyof typeof theme.glassCards,
    nextBrp?: nextBrp,
};

export default BrpGameConfig;
