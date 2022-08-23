import { Box, List, ListItem, SxProps, Theme } from '@mui/material';
import { MouseEventHandler, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const homeStyle: SxProps<Theme> = {
    ul: {
        '&.ready': {
            transition: 'all 400ms cubic-bezier(0, 0.63, 0.52, 1)',
            left: '0'
        },
        '&.navigating': {
            transition: 'all 400ms cubic-bezier(0, 0.63, 0.52, 1)',
            left: '100vw'
        },
        fontFamily: 'Righteous,cursive',
        position: 'relative',
        left: '-100vw',
        display: 'flex',
        flexDirection: 'column',
        gap: '30px',
        li: {
            position: 'relative',
            listStyle: 'none',
            a: {
                position: 'relative',
                fontSize: '72px',
                fontWeight: 'bold',
                textDecoration: 'none',
                lineHeight: '72px',
                letterSpacing: ' 2px',
                textTransform: 'uppercase',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(225, 225, 225, 0.5)',
                paddingLeft: '21px',
                '&::before': {
                    content: 'attr(data-text)',
                    position: 'absolute',
                    left: '3px',
                    top: '1px',
                    color: 'white',
                    width: 0,
                    overflow: 'hidden',
                    transition: 'all 400ms cubic-bezier(0, 0.63, 0.52, 1)',
                    borderLeft: '8px solid var(--item-colour)',
                    WebkitTextStroke: '1px var(--item-colour)',
                    paddingLeft: '10px'
                },
                '&.active::before': {
                    width: '106%',
                    borderRight: '8px solid var(--item-colour)',
                    filter: 'drop-shadow(0 0 25px var(--item-colour))'
                }
            }
        }
    }
};

const getColour = (colour: string): SxProps<Theme> => ({
    '--item-colour': colour
});

const menuItems = [
    { to: '/flo', text: 'BRP', colour: getColour('#007c0a') },
    { to: '/brp', text: 'FLO', colour: getColour('#00559b') },
    { to: '/team', text: 'TEAM', colour: getColour('#a10b00') }
];

const Home = () => {
    const navigate = useNavigate();

    const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
        const link = event.currentTarget;
        if (!link) return;

        const to = link.getAttribute('data-to');
        if (!to) return;

        link.classList.add('active');
        const listClasses = link.parentElement?.parentElement?.classList;
        setTimeout(() => {
            listClasses?.add('navigating');
            setTimeout(() => navigate(to), 400);
        }, 400);
    };

    useEffect(() => {
        document.getElementById('homeMenu')?.classList.add('ready');
    }, []);

    return (
        <Box sx={homeStyle} classes="navigating">
            <List id="homeMenu">
                {menuItems.map(({ to, text, colour: sx }) => (
                    <ListItem key={to} sx={sx}>
                        <Link
                            data-text={text}
                            data-to={to}
                            to={to}
                            onClick={handleClick}
                        >
                            {text}
                        </Link>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default Home;
