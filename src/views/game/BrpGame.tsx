import { Box, styled, SxProps, Theme, Typography } from '@mui/material';
import { SnackbarProps, useSnackbar } from 'notistack';
import React, { useEffect, useRef, useState } from 'react';
import BrpGameConfig from '../../lib/BrpGameEngine/BrpGameConfig';
import startGame from '../../lib/BrpGameEngine/startGame';
import submitGuess from '../../lib/BrpGameEngine/submitGuess';
import log from '../../Logger';
import { BrpContextProvider } from './BrpGameContext';
import CloseLink from './CloseLink';
import Counter from './Counter';
import LetterCard from './LetterCard';

const snackProps: SnackbarProps = {
    anchorOrigin: { vertical: 'bottom', horizontal: 'center' }
};

const widthHeight = {
    xs: '100px',
    md: '120px'
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
        md: '440px'
    },
    lineHeight: {
        xs: '22px',
        md: '38px'
    },
    fontSize: {
        xs: '22px',
        md: '38px'
    },
    textAlign: 'center',
    fontWeight: 600,
    letterSpacing: '4px',
    borderRadius: 2,
    boxShadow: '0px 0px 6px 3px #000',
    margin: '20px 0',
    border: 'none'
};

const statsStyle: SxProps<Theme> = {
    margin: '20px',
    minHeight: '50px'
};

const statsItemStyle: SxProps<Theme> = {
    TextAlign: 'center'
};

const GuessInput = styled('input')({});

const closeStyles: SxProps<Theme> = {
    '&.ready': {
        transition: 'all 400ms cubic-bezier(0, 0.63, 0.52, 1)',
        left: '0'
    },
    left: '-100vw',
    transition: 'all 400ms cubic-bezier(0, 0.37, 0.48, 1)',
    position: 'relative'
};

const BrpGame = ({ gameMode, background }: BrpGameConfig) => {
    const [brpGameState, setGameState] = useState(startGame({ gameMode }));
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

        const newState = submitGuess(brpGameState);
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
            newState.lastGuessMessages?.forEach((m) => {
                enqueueSnackbar(m, {
                    ...snackProps,
                    variant: 'info'
                });
            });
        }
    };

    useEffect(() => {
        const homeMenu = document.getElementById('brpGameContainer');
        if (!homeMenu) return;
        setTimeout(() => homeMenu.classList.add('ready'), 50);
    }, []);

    return (
        <Box id="brpGameContainer" sx={closeStyles}>
            <BrpContextProvider value={{ gameMode, background }}>
                <CloseLink />
                <Box sx={statsStyle}>
                    <Box sx={statsItemStyle}>
                        {brpGameState.finished ? null : (
                            <Typography sx={{ fontSize: '34px' }}>
                                {brpGameState.points
                                    ? `${brpGameState.points} points`
                                    : 'Start'}
                            </Typography>
                        )}
                    </Box>
                </Box>

                {brpGameState.finished ? null : (
                    <Box>
                        <GuessInput
                            sx={guessInputSyle}
                            ref={guessInput}
                            type="text"
                            value={guess}
                            onChange={change}
                            onKeyDown={keyDown}
                            onKeyUp={keyUp}
                            disabled={brpGameState.finished}
                        />
                    </Box>
                )}
                <Box sx={{ margin: '20px 0' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Box sx={letterStyle}>
                            <LetterCard
                                text={
                                    brpGameState.finished
                                        ? brpGameState.finalScore?.[0] || 0
                                        : brpGameState.brp[0]
                                }
                            />
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
                            <LetterCard
                                text={
                                    brpGameState.finished
                                        ? brpGameState.finalScore?.[1] || 0
                                        : brpGameState.brp[1]
                                }
                            />
                        </Box>
                        <Box sx={letterStyle}>
                            <LetterCard
                                text={
                                    brpGameState.finished
                                        ? brpGameState.finalScore?.[2] || 0
                                        : brpGameState.brp[2]
                                }
                            />
                        </Box>
                    </Box>
                </Box>
                <Box sx={statsStyle}>
                    <Box sx={statsItemStyle}>
                        {brpGameState.finished ? (
                            <Typography sx={{ fontSize: '34px' }}>
                                GAME OVER!
                            </Typography>
                        ) : (
                            <Counter counter={brpGameState.counter} />
                        )}
                    </Box>
                </Box>
                {brpGameState.answers?.map((a) => (
                    <Typography key={a.word} sx={{ fontSize: '24px' }}>
                        {`${a.word} (${a.points})`}
                    </Typography>
                ))}
            </BrpContextProvider>
        </Box>
    );
};

export default BrpGame;
