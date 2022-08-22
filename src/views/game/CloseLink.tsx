import { Box, SxProps, Theme } from '@mui/material';
import { Link } from 'react-router-dom';

const closeLinkStyle: SxProps<Theme> = {
    position: 'relative',
    left: '-50%;',
    display: 'inline',
    marginLeft: '18px',
    a: {
        fontWeight: '600',
        textDecoration: 'none',
        background: '#444',
        padding: '6px 10PX',
        borderRadius: '3px',
        color: 'red',
        width: '22px',
        transition: '275MS',
        '&:hover': {
            background: '#fff'
        }
    }
};

const CloseLink = () => (
    <Box sx={closeLinkStyle}>
        <Link to="/">X</Link>
    </Box>
);

export default CloseLink;
