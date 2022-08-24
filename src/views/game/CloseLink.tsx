import { Box, SxProps, Theme } from '@mui/material';
import { MouseEventHandler } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const closeLinkStyle: SxProps<Theme> = {
    position: 'absolute',
    left: '2px',
    top: '10px',
    display: 'inline',
    a: {
        fontWeight: '600',
        textDecoration: 'none',
        background: '#444',
        padding: '14px 14px 6px',
        fontSize: '22px',
        borderRadius: '3px',
        color: 'red',
        transition: '275MS',
        '&:hover': {
            background: '#fff'
        }
    }
};

const CloseLink = () => {
    const navigate = useNavigate();

    const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
        event.preventDefault();
        const link = event.currentTarget;
        if (!link) return;

        const to = link.getAttribute('data-to');
        if (!to) return;

        link.classList.add('active');
        const listClasses = link.parentElement?.parentElement?.classList;
        listClasses?.remove('ready');
        setTimeout(() => navigate(to), 400);
    };

    return (
        <Box sx={closeLinkStyle}>
            <Link data-to="/" to="/" onClick={handleClick}>
                X
            </Link>
        </Box>
    );
};

export default CloseLink;
