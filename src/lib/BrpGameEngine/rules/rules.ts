import BrpGameState from '../BrpGameState';
import GameMode from '../GameMode';
import brp from './brp';
import flo from './flo';
import gro from './gro';
import kno from './kno';

const rules: { [key in GameMode]: (state: BrpGameState) => BrpGameState } = { brp, flo, gro, kno };
export default rules;
