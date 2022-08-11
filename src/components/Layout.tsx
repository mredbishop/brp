import { useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import React, { FC } from 'react';

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
    const p = document.location.pathname;
    let currentValue = 'brp';
    if (p === '/stats') currentValue = 'stats';
    else if (p === '/flo') currentValue = 'flo';
    const [value, setValue] = React.useState(currentValue);

    const handleChange = (
        _e: React.SyntheticEvent<Element, Event>,
        newValue: string
    ) => {
        setValue(newValue);
    };

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const fontSize = isSmallScreen ? 'medium' : 'large';

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                textAlign: 'center'
            }}
        >
            <Box
                component="main"
                sx={{
                    height: '100%',
                    flexGrow: 1,
                    width: '100%',
                    padding: 2,
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Box sx={{ flexGrow: 1 }}>{children}</Box>
                {/* <Box>
                    <BottomNavigation
                        sx={{
                            width: '100%',
                            mt: 2,
                            borderRadius: 1,
                            background: '#000',
                            height: isSmallScreen ? '56px' : '76px'
                        }}
                        showLabels
                        value={value}
                        onChange={handleChange}
                    >
                        <BottomNavigationAction
                            component={Link}
                            to="/"
                            label="Brp"
                            value="brp"
                            icon={<BrpIcon fontSize={fontSize} />}
                        />
                        <BottomNavigationAction
                            component={Link}
                            to="/stats"
                            label="Stats"
                            value="stats"
                            icon={<StatsIcon fontSize={fontSize} />}
                        />
                        <BottomNavigationAction
                            component={Link}
                            to="/flo"
                            label="Flo"
                            value="flo"
                            icon={<FloIcon fontSize={fontSize} />}
                        />
                    </BottomNavigation>
                </Box> */}
            </Box>
        </Box>
    );
};

export default Layout;
