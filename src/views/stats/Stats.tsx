import {
    Box, Container, Grid, Typography
} from '@mui/material';
import { useSnackbar } from 'notistack';
import { GradientButton } from '../../components/buttons/GradientButton';
import GlassCard from '../../components/cards/GlassCard';
import useStats from '../../hooks/useStats';

function Stats() {
    const { games } = useStats();

    const { enqueueSnackbar } = useSnackbar();

    const showNotification = () => {
        enqueueSnackbar('Hello!', { variant: 'success' });
    };

    return (
        <Container>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography>Overview</Typography>
                </Grid>
                <Grid item xs={12}>
                    <GlassCard>
                        <Box sx={{ p: 3 }}>
                            Games&nbsp;
                            {games}
                        </Box>
                        <Box sx={{ mt: 2, p: 3 }}>
                            <GradientButton color="primary" onClick={showNotification} text="Show Notification" />
                        </Box>
                    </GlassCard>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Stats;
