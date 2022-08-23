import { Box, List, ListItem, SxProps, Theme, Typography } from '@mui/material';
import CloseLink from '../game/CloseLink';

const teamStyle: SxProps<Theme> = {
    li: {
        justifyContent: 'center'
    }
};

const Team = () => (
    <Box sx={teamStyle}>
        <CloseLink />

        <Box>
            <Typography variant="h3">The BRP Team</Typography>
            <br />
            <Typography variant="h4">Coding</Typography>
            <Box sx={{ margin: '0 auto' }}>
                <List>
                    <ListItem>
                        <span>
                            <b>&nbsp;Tedward&nbsp;</b>
                            Bishop
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
                            <b>&nbsp;Suzebury&nbsp;</b>
                            Bishop
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
                            <b>&nbsp;Magic&nbsp;</b>
                            Bishop
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
                            <b>&nbsp;Lizard&nbsp;</b>
                            Appleyard
                        </span>
                    </ListItem>
                </List>
            </Box>
        </Box>
    </Box>
);

export default Team;
