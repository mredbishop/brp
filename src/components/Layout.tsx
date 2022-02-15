import { SvgIconComponent } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo.svg';

export type SidebarLinkProps = {
  url: string;
  text: string;
  Icon: SvgIconComponent | React.FunctionComponent;
};

const drawerWidth = 240;

const SidebarLink: FC<SidebarLinkProps> = function SidebarLink({ text, Icon, url }) {
    return (
        <ListItem button component={Link} to={url}>
            <ListItemIcon>
                <Icon />
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    );
};

type LayoutProps = {
  children: React.ReactNode;
  links: Array<SidebarLinkProps>;
};

export const Layout: FC<LayoutProps> = function Layout({ children, links }) {
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <ListItem
                sx={{
                    p: 2,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                button
                component={Link}
                to="/"
            >
                <img height={38} alt="App Logo" src={logo} />
            </ListItem>
            <Divider />
            <Box sx={{ flex: 1 }}>
                <List>
                    {links.map((link) => <SidebarLink key={link.text} {...link} />)}
                </List>
            </Box>

            <Box sx={{ borderTop: 1, borderColor: 'divider', textAlign: 'center' }}>
                <Typography variant="overline" fontWeight="bold" color="text.secondary">
                    1.0.0-ALPHA
                </Typography>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex', height: '100%' }}>
            <AppBar
                elevation={0}
                position="fixed"
                sx={{
                    background: 'transparent',
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` }
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
            >
                <Drawer
                    elevation={0}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth
                        }
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: { xs: 'none', sm: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth
                        }
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{
                    height: '100%',
                    flexGrow: 1,
                    width: { sm: `calc(100% - ${drawerWidth}px)` }
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
