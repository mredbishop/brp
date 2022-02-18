import {
    Box, Container, Typography
} from '@mui/material';
import GlassCard from '../../components/cards/GlassCard';

const Stats = () => (
    <Container>
        <GlassCard>
            <Box sx={{ p: 3 }}>
                <Typography>
                    The total umber of games you&apos;ve won/lost etc will
                    be shown here along with cool stats!
                </Typography>
            </Box>
        </GlassCard>
    </Container>
);

export default Stats;
