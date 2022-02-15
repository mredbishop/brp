import { Box, Container } from '@mui/material';
import Letter from './Letter';
import { TLetter } from './TLetter';

type TProps = { initialLetters: [TLetter, TLetter, TLetter] };
export default function Game({ initialLetters }: TProps) {
    return (
        <Container maxWidth="sm">
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box sx={{ flex: 1, mr: 2 }}>
                    <Letter letter={initialLetters[0]} />
                </Box>
                <Box sx={{ flex: 1, mr: 2, ml: 2 }}>
                    <Letter letter={initialLetters[1]} />
                </Box>
                <Box sx={{ flex: 1, ml: 2 }}>
                    <Letter letter={initialLetters[2]} />
                </Box>
            </Box>
        </Container>
    );
}
