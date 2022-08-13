import { Box, Button, SxProps, Theme } from '@mui/material';
import { Link } from 'react-router-dom';

const btnStyle: SxProps<Theme> = {
    margin: '10px',
    width: '200px',
    color: '#fff'
};
const Home = () => (
    <Box>
        <Box>
            <Link to="/brp">
                <Button sx={btnStyle} variant="contained">
                    BRP
                </Button>
            </Link>
        </Box>
        <Box>
            <Link to="/flo">
                <Button sx={btnStyle} variant="contained">
                    FLO
                </Button>
            </Link>
        </Box>
        <Box>
            <Link to="/stats">
                <Button sx={btnStyle} variant="contained">
                    Stats
                </Button>
            </Link>
        </Box>
    </Box>
);

export default Home;
