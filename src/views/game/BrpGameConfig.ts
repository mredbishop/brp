import theme from '../../Theme';
import GameMode from './GameMode';

type BrpGameConfig = {
    gameMode: GameMode,
    background: keyof typeof theme.glassCards
};

export default BrpGameConfig;
