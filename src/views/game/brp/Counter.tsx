import { Box, Typography } from '@mui/material';

const Counter = ({ counter }: { counter: number }) => (
    <Box>
        <Typography>{counter}</Typography>
    </Box>
);
export default Counter;
