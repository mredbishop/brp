import {
    Box, SxProps, Theme
} from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import log from '../../Logger';
import theme from '../../Theme';
import BrpGameConfig from './BrpGameConfig';
import { BrpContextProvider } from './BrpGameContext';
import BrpGameEngine from './BrpGameEngine';
import LetterCard from './LetterCard';

const BrpGame = ({ gameMode, background }: BrpGameConfig) => {
    const [brpGameEngine, setGameEngine] = useState(new BrpGameEngine({ gameMode, maxLevel: 2 }));
    const [guess, setGuess] = useState('');

    const { enqueueSnackbar } = useSnackbar();

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const index = e.target.selectionStart;
        let thisGuess = e.target.value;

        let modified = false;
        if (/[^A-Z]/.test(thisGuess)) {
            thisGuess = e.target.value.toLocaleUpperCase().replace(/[^A-Z]/g, '');
            modified = true;
        }

        setGuess(thisGuess);
        brpGameEngine.guess = thisGuess;
        setGameEngine(brpGameEngine);

        if (modified) {
            requestAnimationFrame(() => {
                e.target.selectionStart = index;
                e.target.selectionEnd = index;
            });
        }

        log(JSON.stringify(brpGameEngine));
    };

    const keyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const isValidKey = /[A-Z]|(?:Enter)|(?:Backspace)|(?:Delete)/i.test(e.key);
        log(`${isValidKey ? 'Valid' : 'Invalid'} key:`, e.key);
        if (!isValidKey) return e.preventDefault();
    };

    const keyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const isEnter = /(?:Enter)/i.test(e.key);
        if (!isEnter) return;

        const result = brpGameEngine.submitGuess();
        setGameEngine(brpGameEngine);
        if (result.ok) {
            if (result.points !== brpGameEngine.points) {
                enqueueSnackbar(`Nice, ${result.points} points, you now have ${brpGameEngine.points} total`, { variant: 'success' });
            } else {
                enqueueSnackbar(`Nice, ${result.points} points!`, { variant: 'success' });
            }
            setGuess('');
        } else {
            if (result.clear) setGuess('');
            enqueueSnackbar(`${result.message}`, { variant: 'info' });
        }
    };

    const letterStyle: SxProps<Theme> = {
        flex: 1,
        width: '28vw',
        height: '28vw',
        borderRadius: '6px',
        border: '1px solid #fff',
        boxShadow: '0px 0px 4px 3px #ffffff55'
    };

    const inputStyle: React.CSSProperties = {
        border: '1px solid #fff',
        background: theme.glassCards[background],
        color: 'white',
        padding: '8px',
        width: '100%',
        lineHeight: '5vw',
        fontSize: '5vw',
        textAlign: 'center',
        fontWeight: 600,
        fontFamily: theme.typography.fontFamily,
        letterSpacing: '8px',
        borderRadius: '6px',
        boxShadow: '0px 0px 4px 3px #ffffff55',
        marginTop: '24px'
    };

    return (
        <BrpContextProvider value={{ gameMode, background }}>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={letterStyle}>
                        <LetterCard brpLetter={brpGameEngine.brp[0]} />
                    </Box>
                    <Box sx={{ ...letterStyle, mr: 3, ml: 3 }}>
                        <LetterCard brpLetter={brpGameEngine.brp[1]} />
                    </Box>
                    <Box sx={letterStyle}>
                        <LetterCard brpLetter={brpGameEngine.brp[2]} />
                    </Box>
                </Box>
            </Box>
            <Box>
                <input style={inputStyle} type="text" value={guess} onChange={change} onKeyDown={keyDown} onKeyUp={keyUp} />
            </Box>

        </BrpContextProvider>
    );
};

export default BrpGame;
