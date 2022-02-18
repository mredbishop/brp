import StatsIcon from '@mui/icons-material/EmojiEventsTwoTone';
import FloIcon from '@mui/icons-material/RocketLaunchTwoTone';
import BrpIcon from '@mui/icons-material/RocketTwoTone';
import {
    BottomNavigation,
    BottomNavigationAction,
    Container
} from '@mui/material';
import Box from '@mui/material/Box';
import { useSnackbar } from 'notistack';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

type LayoutProps = {
    children: React.ReactNode;
};

let sayHello: any;
let saidHello = false;
export const Layout: FC<LayoutProps> = ({ children }) => {
    const p = document.location.pathname;
    let currentValue = 'stats';
    if (p === '/brp') currentValue = 'brp';
    else if (p === '/flo') currentValue = 'flo';
    const [value, setValue] = React.useState(currentValue);

    const handleChange = (_e: React.SyntheticEvent<Element, Event>, newValue: string) => {
        setValue(newValue);
    };

    const { enqueueSnackbar } = useSnackbar();
    clearTimeout(sayHello);
    sayHello = setTimeout(() => {
        if (saidHello) return;
        saidHello = true;
        enqueueSnackbar('Welcome to BRP!!!', { variant: 'success' });
    }, 250);

    return (
        <Box sx={{ display: 'flex', height: '100%' }}>
            <Box
                component="main"
                sx={{
                    height: '100%',
                    flexGrow: 1,
                    width: '100%',
                    padding: '24px'
                }}
            >
                <Container>
                    <BottomNavigation sx={{ width: '100%', mb: '24px', borderRadius: '6px' }} value={value} onChange={handleChange}>
                        <BottomNavigationAction
                            component={Link}
                            to="/brp"
                            label="Brp"
                            value="brp"
                            icon={<BrpIcon />}
                        />
                        <BottomNavigationAction
                            component={Link}
                            to="/"
                            label="Stats"
                            value="stats"
                            icon={<StatsIcon />}
                        />
                        <BottomNavigationAction
                            component={Link}
                            to="/flo"
                            label="Flo"
                            value="flo"
                            icon={<FloIcon />}
                        />
                    </BottomNavigation>
                </Container>
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
