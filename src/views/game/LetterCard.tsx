import { Box, Typography } from '@mui/material';
import GlassCard from '../../components/cards/GlassCard';
import BrpLetter from '../../lib/BrpGameEngine/BrpLetter';
import { useBrpGameContext } from './BrpGameContext';

type LetterCardConfig = { text: number | BrpLetter };

const LetterCard = ({ text }: LetterCardConfig) => {
    const { background } = useBrpGameContext();

    return (
        <GlassCard background={background}>
            <Box sx={{ textAlign: 'center' }}>
                <Typography
                    sx={{
                        fontWeight: 600,
                        fontSize: {
                            xs: '80px',
                            md: '96px'
                        },
                        textShadow: '-10px 10px 5px #000'
                    }}
                >
                    {text}
                </Typography>
            </Box>
        </GlassCard>
    );
};
export default LetterCard;
