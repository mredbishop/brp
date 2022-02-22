import { Box, Typography } from '@mui/material';
import GlassCard from '../../components/cards/GlassCard';
import { useBrpGameContext } from './BrpGameContext';
import BrpLetter from './BrpLetter';

type LetterCardConfig = {brpLetter: BrpLetter};

const LetterCard = ({ brpLetter }: LetterCardConfig) => {
    const { background } = useBrpGameContext();
    return (
        <GlassCard background={background}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography sx={{ fontWeight: 600, fontSize: '20vw', textShadow: '-1vw 1vw 0.5vw #000' }}>{brpLetter}</Typography>
            </Box>
        </GlassCard>
    );
};
export default LetterCard;
