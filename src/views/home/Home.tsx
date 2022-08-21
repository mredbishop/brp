import { Box, List, ListItem, SxProps, Theme } from '@mui/material';
import { Link } from 'react-router-dom';

const homeStyle: SxProps<Theme> = {
    ul: {
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
                    transition: '0.75s',
                    borderLeft: '8px solid var(--item-colour)',
                    WebkitTextStroke: '1px var(--item-colour)'
                },
                '&:hover::before': {
                    width: '110%',
                    borderRight: '8px solid var(--item-colour)',
                    filter: 'drop-shadow(0 0 25px var(--item-colour))'
                },
                '&:active::before': {
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
    //    { to: '/brp', text: 'FLO', colour: getColour('#00559b') },
    { to: '/flo', text: 'BRP', colour: getColour('#007c0a') }
    //    { to: '/stats', text: 'STATS', colour: getColour('#a10b00') }
];

const Home = () => (
    <Box sx={homeStyle}>
        <List>
            {menuItems.map(({ to, text, colour: sx }) => (
                <ListItem key={to} sx={sx}>
                    <Link data-text={text} to={to}>
                        {text}
                    </Link>
                </ListItem>
            ))}
        </List>
        <h2>Testing Team</h2>
        <List>
            <ListItem>
                <span>
                    Ed
                    <b>&nbsp;Cowboy&nbsp;</b>
                    Bishop
                </span>
            </ListItem>
            <ListItem>
                <span>
                    Susie
                    <b>&nbsp;Rock Chick&nbsp;</b>
                    Bishop
                </span>
            </ListItem>
            <ListItem>
                <span>
                    Carla
                    <b>&nbsp;Magic&nbsp;</b>
                    Bishop
                </span>
            </ListItem>
            <ListItem>
                <span>
                    Chris
                    <b>&nbsp;Maverick&nbsp;</b>
                    Bruce
                </span>
            </ListItem>
        </List>
    </Box>
);

export default Home;
