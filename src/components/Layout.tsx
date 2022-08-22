import Box from '@mui/material/Box';
import React, { FC } from 'react';

type LayoutProps = {
    children: React.ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => (
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
        </Box>
    </Box>
);

export default Layout;
