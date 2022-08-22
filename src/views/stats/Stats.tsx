import { Box, List, ListItem } from '@mui/material';
import CloseLink from '../game/CloseLink';

const Stats = () => (
    <Box>
        <CloseLink />

        <Box sx={{ p: 3 }}>
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
    </Box>
);

export default Stats;
