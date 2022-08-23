import { Box, Typography } from '@mui/material';
import GlassCard from '../../components/cards/GlassCard';
import BrpLetter from '../../lib/BrpGameEngine/BrpLetter';
import { useBrpGameContext } from './BrpGameContext';

type LetterCardConfig = { brpLetter: BrpLetter };

const LetterCard = ({ brpLetter }: LetterCardConfig) => {
    const { background } = useBrpGameContext();
    return (
        <GlassCard background={background}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: {
                            xs: '70px',
                            md: '160px'
                        },
                        textShadow: '-10px 10px 5px #000'
                    }}
                >
                    {brpLetter}
                </Typography>
            </Box>
        </GlassCard>
    );
};
export default LetterCard;
