import {
    Box, styled, SxProps, Theme
} from '@mui/material';
import { SnackbarProps, useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import log from '../../Logger';
import BrpGameConfig from './BrpGameConfig';
import { BrpContextProvider } from './BrpGameContext';
import BrpGameEngine from './BrpGameEngine';
import LetterCard from './LetterCard';

const snackProps: SnackbarProps = {
    anchorOrigin: { vertical: 'top', horizontal: 'center' }
};

const letterStyle: SxProps<Theme> = {
    flex: 1,
    width: '28vw',
    height: '28vw',
    borderRadius: 1,
    boxShadow: '0px 0px 6px 3px  #000'
};

const GuessInput = styled('input')((p) => ({
    backgroundColor: '#fff',
    color: '#111',
    padding: '8px',
    width: '100%',
    lineHeight: '5vw',
    fontSize: '5vw',
    textAlign: 'center',
    fontWeight: 600,
    letterSpacing: '8px',
    borderRadius: p.theme.shape.borderRadius,
    boxShadow: '0px 0px 6px 3px #000',
    marginTop: p.theme.spacing(2),
    border: 'none'
}));

const BrpGame = ({ gameMode, background }: BrpGameConfig) => {
    const [brpGameState, setGameState] = useState(BrpGameEngine.startGame({ gameMode }));
    const [guess, setGuess] = useState('');
    const guessInput = useRef<HTMLInputElement>(null);
    useEffect(() => guessInput.current?.focus(), []);

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
        brpGameState.lastGuess = thisGuess;
        setGameState(brpGameState);

        if (modified) {
            requestAnimationFrame(() => {
                e.target.selectionStart = index;
                e.target.selectionEnd = index;
            });
        }

        log(JSON.stringify(brpGameState));
    };

    const keyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const isValidKey = /[A-Z]|(?:Enter)|(?:Backspace)|(?:Delete)/i.test(e.key);
        log(`${isValidKey ? 'Valid' : 'Invalid'} key:`, e.key);
        if (!isValidKey) return e.preventDefault();
    };

    const keyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const isEnter = /(?:Enter)/i.test(e.key);
        if (!isEnter) return;

        const newState = BrpGameEngine.submitGuess(brpGameState);
        setGameState(newState);
        if (newState.lastGuessOk) {
            if (brpGameState.points) {
                enqueueSnackbar(`Nice, ${newState.answers[0].points} points, you now have ${newState.points} total`, { ...snackProps, variant: 'success' });
            } else {
                enqueueSnackbar(`Nice, ${newState.points} points!`, { ...snackProps, variant: 'success' });
            }
            setGuess('');
        } else {
            setGuess('');
            enqueueSnackbar(`${newState.lastGuessMessage}`, { ...snackProps, variant: 'info' });
        }
    };

    return (
        <BrpContextProvider value={{ gameMode, background }}>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={letterStyle}><LetterCard brpLetter={brpGameState.brp[0]} /></Box>
                    <Box sx={{ ...letterStyle, ml: '3vw', mr: '3vw' }}><LetterCard brpLetter={brpGameState.brp[1]} /></Box>
                    <Box sx={letterStyle}><LetterCard brpLetter={brpGameState.brp[2]} /></Box>
                </Box>
            </Box>
            <Box>
                <GuessInput ref={guessInput} type="text" value={guess} onChange={change} onKeyDown={keyDown} onKeyUp={keyUp} />
            </Box>

        </BrpContextProvider>
    );
};

export default BrpGame;
