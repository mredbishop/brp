import { Box, styled, SxProps, Theme, Typography } from '@mui/material';
import { SnackbarProps, useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import log from '../../Logger';
import BrpGameConfig from './BrpGameConfig';
import { BrpContextProvider } from './BrpGameContext';
import BrpGameEngine from './BrpGameEngine';
import LetterCard from './LetterCard';

const snackProps: SnackbarProps = {
    anchorOrigin: { vertical: 'bottom', horizontal: 'center' }
};

const widthHeight = {
    xs: '100px',
    md: '240px'
};

const letterStyle: SxProps<Theme> = {
    flex: 1,
    minWidth: widthHeight,
    maxWidth: widthHeight,
    minHeight: widthHeight,
    maxHeight: widthHeight,
    borderRadius: 1,
    boxShadow: '0px 0px 6px 3px  #000'
};

const guessInputSyle: SxProps<Theme> = {
    backgroundColor: '#fff',
    color: '#111',
    padding: '8px',
    width: {
        xs: '340px',
        md: '800px'
    },
    lineHeight: {
        xs: '22px',
        md: '50px'
    },
    fontSize: {
        xs: '22px',
        md: '50px'
    },
    textAlign: 'center',
    fontWeight: 600,
    letterSpacing: '4px',
    borderRadius: 2,
    boxShadow: '0px 0px 6px 3px #000',
    marginTop: '20px',
    border: 'none'
};

const GuessInput = styled('input')();

const BrpGame = ({ gameMode, background }: BrpGameConfig) => {
    const [brpGameState, setGameState] = useState(
        BrpGameEngine.startGame({ gameMode })
    );
    const [guess, setGuess] = useState('');
    const guessInput = useRef<HTMLInputElement>(null);
    useEffect(() => guessInput.current?.focus(), []);

    const { enqueueSnackbar } = useSnackbar();

    const change = (e: React.ChangeEvent<HTMLInputElement>) => {
        const index = e.target.selectionStart;
        let thisGuess = e.target.value;

        let modified = false;
        if (/[^A-Z]/.test(thisGuess)) {
            thisGuess = e.target.value
                .toLocaleUpperCase()
                .replace(/[^A-Z]/g, '');
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
        const isValidKey = /[A-Z]|(?:Enter)|(?:Backspace)|(?:Delete)/i.test(
            e.key
        );
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
                enqueueSnackbar(
                    `Nice, ${newState.answers[0].points} points, you now have ${newState.points} total`,
                    { ...snackProps, variant: 'success' }
                );
            } else {
                enqueueSnackbar(`Nice, ${newState.points} points!`, {
                    ...snackProps,
                    variant: 'success'
                });
            }
            setGuess('');
        } else {
            setGuess('');
            enqueueSnackbar(`${newState.lastGuessMessage}`, {
                ...snackProps,
                variant: 'info'
            });
        }
    };

    return (
        <BrpContextProvider value={{ gameMode, background }}>
            <Box display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h4" component="h1">
                    {brpGameState.points
                        ? `${brpGameState.points} points`
                        : 'Start'}
                </Typography>
            </Box>
            <Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={letterStyle}>
                        <LetterCard brpLetter={brpGameState.brp[0]} />
                    </Box>
                    <Box
                        sx={{
                            ...letterStyle,
                            ml: {
                                xs: '20px',
                                md: '40px'
                            },
                            mr: {
                                xs: '20px',
                                md: '40px'
                            }
                        }}
                    >
                        <LetterCard brpLetter={brpGameState.brp[1]} />
                    </Box>
                    <Box sx={letterStyle}>
                        <LetterCard brpLetter={brpGameState.brp[2]} />
                    </Box>
                </Box>
            </Box>
            <Box>
                <GuessInput
                    sx={guessInputSyle}
                    ref={guessInput}
                    type="text"
                    value={guess}
                    onChange={change}
                    onKeyDown={keyDown}
                    onKeyUp={keyUp}
                />
            </Box>
        </BrpContextProvider>
    );
};

export default BrpGame;
