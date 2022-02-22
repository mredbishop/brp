import StatsIcon from '@mui/icons-material/EmojiEventsTwoTone';
import FloIcon from '@mui/icons-material/RocketLaunchTwoTone';
import BrpIcon from '@mui/icons-material/RocketTwoTone';
import {
    BottomNavigation,
    BottomNavigationAction
} from '@mui/material';
import Box from '@mui/material/Box';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import theme from '../Theme';

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
    const p = document.location.pathname;
    let currentValue = 'brp';
    if (p === '/stats') currentValue = 'stats';
    else if (p === '/flo') currentValue = 'flo';
    const [value, setValue] = React.useState(currentValue);

    const handleChange = (_e: React.SyntheticEvent<Element, Event>, newValue: string) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ display: 'flex', height: '100%' }}>
            <Box
                component="main"
                sx={{
                    height: '100%',
                    flexGrow: 1,
                    width: '100%',
                    padding: theme.margins.standard,
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Box sx={{ flexGrow: 1 }}>
                    {children}
                </Box>
                <Box>
                    <BottomNavigation
                        sx={{
                            width: '100%', mt: theme.margins.standard, borderRadius: theme.borders.radius, background: '#000'
                        }}
                        value={value}
                        onChange={handleChange}
                    >
                        <BottomNavigationAction
                            component={Link}
                            to="/"
                            label="Brp"
                            value="brp"
                            icon={<BrpIcon />}
                        />
                        <BottomNavigationAction
                            component={Link}
                            to="/stats"
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
                </Box>
            </Box>
        </Box>
    );
};

export default Layout;
