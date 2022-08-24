import { Box, List, ListItem, SxProps, Theme } from '@mui/material';
import { MouseEventHandler, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const homeStyle: SxProps<Theme> = {
    ul: {
        '&.ready': {
            transition: 'all 400ms cubic-bezier(0, 0.63, 0.52, 1)',
            left: '0'
        },
        left: '-100vw',
        transition: 'all 400ms cubic-bezier(0, 0.37, 0.48, 1)',
        fontFamily: 'Luckiest Guy',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        li: {
            position: 'relative',
            listStyle: 'none',
            a: {
                position: 'relative',
                // margin: '0 auto',
                fontSize: '64px',
                fontWeight: 'bold',
                textDecoration: 'none',
                lineHeight: '72px',
                letterSpacing: ' 2px',
                textTransform: 'uppercase',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(225, 225, 225, 0.5)',
                padding: '14px 0 0 21px',
                '&::before': {
                    content: 'attr(data-text)',
                    position: 'absolute',
                    left: '3px',
                    top: '0',
                    color: 'white',
                    width: 0,
                    overflow: 'hidden',
                    transition: 'all 400ms cubic-bezier(0, 0.63, 0.52, 1)',
                    borderLeft: '8px solid var(--item-colour)',
                    WebkitTextStroke: '1px var(--item-colour)',
                    padding: '14px 0 0 10px'
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
    { to: '/brp', text: 'BRP', colour: getColour('#ff0080') },
    { to: '/flo', text: 'FLO', colour: getColour('#ffd900') },
    { to: '/gro', text: 'GRO', colour: getColour('#00970d') },
    { to: '/kno', text: 'KNO', colour: getColour('#0069be') },
    { to: '/who', text: 'WHO', colour: getColour('#ff9900') }
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
            listClasses?.remove('ready');
            setTimeout(() => navigate(to), 400);
        }, 400);
    };

    useEffect(() => {
        const homeMenu = document.getElementById('homeMenu');
        if (!homeMenu) return;
        setTimeout(() => homeMenu.classList.add('ready'), 50);
    }, []);

    return (
        <Box sx={homeStyle}>
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
