import { Box, List, ListItem, SxProps, Theme, Typography } from '@mui/material';
import { useEffect } from 'react';
import CloseLink from '../game/CloseLink';

const teamStyle: SxProps<Theme> = {
    '&.ready': {
        transition: 'all 400ms cubic-bezier(0, 0.63, 0.52, 1)',
        left: '0'
    },
    position: 'relative',
    left: '-100vw',
    transition: 'all 400ms cubic-bezier(0, 0.37, 0.48, 1)',
    li: {
        justifyContent: 'center'
    }
};

const Who = () => {
    useEffect(() => {
        const homeMenu = document.getElementById('teamContainer');
        if (!homeMenu) return;
        setTimeout(() => homeMenu.classList.add('ready'), 50);
    }, []);

    return (
        <Box id="teamContainer" sx={teamStyle}>
            <CloseLink />
            <Box>
                <br />
                <br />
                <Typography variant="h3">The BRP Team</Typography>
                <br />
                <Typography variant="h4">Coding</Typography>
                <Box sx={{ margin: '0 auto' }}>
                    <List>
                        <ListItem>
                            <span>
                                <b>&nbsp;Ted&nbsp;</b>
                                Ward
                            </span>
                        </ListItem>
                    </List>
                </Box>
                <br />
                <Typography variant="h4">Design</Typography>
                <Box sx={{ margin: '0 auto' }}>
                    <List>
                        <ListItem>
                            <span>
                                <b>&nbsp;Suze&nbsp;</b>
                                Bury
                            </span>
                        </ListItem>
                    </List>
                </Box>
                <br />
                <Typography variant="h4">Testing</Typography>
                <Box sx={{ margin: '0 auto' }}>
                    <List>
                        <ListItem>
                            <span>
                                <b>&nbsp;Koala&nbsp;</b>
                                Bear
                            </span>
                        </ListItem>
                        <ListItem>
                            <span>
                                <b>&nbsp;Maverick&nbsp;</b>
                                Bruce
                            </span>
                        </ListItem>
                        <ListItem>
                            <span>
                                <b>&nbsp;Bugular&nbsp;</b>
                                Bewley
                            </span>
                        </ListItem>
                        <ListItem>
                            <span>
                                <b>&nbsp;One Punch&nbsp;</b>
                                Matt
                            </span>
                        </ListItem>
                        <ListItem>
                            <span>
                                <b>&nbsp;Lizard&nbsp;</b>
                                Apples
                            </span>
                        </ListItem>
                    </List>
                </Box>
            </Box>
        </Box>
    );
};

export default Who;
