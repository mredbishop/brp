import { Box, Typography } from '@mui/material';
import GlassCard from '../../components/cards/GlassCard';
import { TLetter } from './TLetter';

export default function Letter({ letter }: {letter: TLetter}) {
    return (
        <GlassCard>
            <Box sx={{ p: 3, textAlign: 'center' }}>
                <Typography sx={{ fontWeight: 600, fontSize: '20vw' }}>{letter}</Typography>
            </Box>
        </GlassCard>
    );
}
