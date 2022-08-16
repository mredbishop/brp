import { Box, Typography } from '@mui/material';

const Counter = ({ counter }: { counter: number }) => (
    <Box>
        <Typography sx={{ fontSize: '72px' }}>{counter}</Typography>
    </Box>
);
export default Counter;
