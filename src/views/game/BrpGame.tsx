import { Box, Container } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import english from '../../dictionaries/english';
import log from '../../Logger';
import theme from '../../Theme';
import BrpGameConfig from './BrpGameConfig';
import { BrpContextProvider } from './BrpGameContext';
import LetterCard from './LetterCard';

const BrpGame = ({ brp, background, nextBrp }: BrpGameConfig) => {
    const [guess, setGuess] = useState(brp.join(''));

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

        if (modified) {
            requestAnimationFrame(() => {
                e.target.selectionStart = index;
                e.target.selectionEnd = index;
            });
        }
    };

    const keyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const isValidKey = /[A-Z]|(?:Enter)|(?:Backspace)|(?:Delete)/i.test(e.key);
        log(`${isValidKey ? 'Valid' : 'Invalid'} key:`, e.key);
        if (!isValidKey) return e.preventDefault();
    };

    const keyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const isEnter = /(?:Enter)/i.test(e.key);
        if (!isEnter) return;

        // Check you used enough the letters
        if (guess.length < 3) {
            enqueueSnackbar('That\'s not enough letters!!!', { variant: 'error' });
            return;
        }

        const has1 = guess.indexOf(brp[0]) > -1;
        const has2 = guess.indexOf(brp[1]) > -1;
        const has3 = guess.indexOf(brp[2]) > -1;
        // Check you used the right letters
        if (!has1 && has2 && has3) {
            enqueueSnackbar(`You didn't use ${brp[0]}!!!`, { variant: 'error' });
            return;
        }

        if (has1 && !has2 && has3) {
            enqueueSnackbar(`You didn't use ${brp[1]}!!!`, { variant: 'error' });
            return;
        }

        if (has1 && has2 && !has3) {
            enqueueSnackbar(`You didn't use ${brp[2]}!!!`, { variant: 'error' });
            return;
        }

        if (!has1 && !has2 && has3) {
            enqueueSnackbar(`You didn't use ${brp[0]} and ${brp[1]}!!!`, { variant: 'error' });
            return;
        }

        if (!has1 && has2 && !has3) {
            enqueueSnackbar(`You didn't use ${brp[0]} and ${brp[2]}!!!`, { variant: 'error' });
            return;
        }

        if (has1 && !has2 && !has3) {
            enqueueSnackbar(`You didn't use ${brp[1]} and ${brp[2]}!!!`, { variant: 'error' });
            return;
        }

        if (!has1 && !has2 && !has3) {
            enqueueSnackbar(`You didn't use ${brp[0]}, ${brp[1]} and ${brp[2]}!!!`, { variant: 'error' });
            return;
        }

        // Check it's a real word.
        if (english.indexOf(guess.toLocaleLowerCase()) === -1) {
            enqueueSnackbar('That\'s not a word!!!', { variant: 'error' });
            return;
        }
        enqueueSnackbar(`Nice, you got one, ${guess.length} points!!!`, { variant: 'success' });
    };

    return (
        <BrpContextProvider value={{ brp, background, nextBrp }}>
            <Container sx={{ mb: '24px' }}>
                <input
                    style={{
                        padding: '8px',
                        width: '100%',
                        lineHeight: '50px',
                        fontSize: '50px',
                        textAlign: 'center',
                        fontWeight: 600,
                        fontFamily: theme.typography.fontFamily,
                        letterSpacing: '8px'
                    }}
                    type="text"
                    value={guess}
                    onChange={change}
                    onKeyDown={keyDown}
                    onKeyUp={keyUp}
                />
            </Container>
            <Container>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box sx={{
                        flex: 1, mr: 2, width: '26vw', height: '26vw'
                    }}
                    >
                        <LetterCard brpLetter={brp[0]} />
                    </Box>
                    <Box sx={{
                        flex: 1, mr: 2, ml: 2, width: '26vw', height: '26vw'
                    }}
                    >
                        <LetterCard brpLetter={brp[1]} />
                    </Box>
                    <Box sx={{
                        flex: 1, ml: 2, width: '26vw', height: '26vw'
                    }}
                    >
                        <LetterCard brpLetter={brp[2]} />
                    </Box>
                </Box>
            </Container>
        </BrpContextProvider>
    );
};

export default BrpGame;
