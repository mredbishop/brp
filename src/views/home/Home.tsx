import { Box, List, ListItem, SxProps, Theme } from '@mui/material';
import { MouseEventHandler } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const homeStyle: SxProps<Theme> = {
    ul: {
        '&.navigating': {
            transition: '350ms',
            transitionTimingFunction: 'linear',
            opacity: 0
        },
        fontFamily: 'Righteous,cursive',
        position: 'relative',
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
                '&::before': {
                    content: 'attr(data-text)',
                    position: 'absolute',
                    left: '-7px',
                    top: '1px',
                    color: 'white',
                    width: 0,
                    overflow: 'hidden',
                    transition: '350ms',
                    transitionTimingFunction: 'ease-in-out',
                    borderLeft: '8px solid var(--item-colour)',
                    WebkitTextStroke: '1px var(--item-colour)'
                },
                '&:active::before': {
                    width: '110%',
                    borderRight: '8px solid var(--item-colour)',
                    filter: 'drop-shadow(0 0 25px var(--item-colour))'
                },
                '&.active::before': {
                    width: '110%',
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
    { to: '/stats', text: 'TEAM', colour: getColour('#a10b00') }
];

const Home = () => {
    const navigate = useNavigate();

    const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
        const to = event.currentTarget.getAttribute('data-to');
        if (!to) return;
        event.currentTarget.parentElement?.parentElement?.classList.add(
            'navigating'
        );
        event.currentTarget.classList.add('active');
        setTimeout(() => navigate(to), 275);
    };

    return (
        <Box sx={homeStyle}>
            <List>
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
