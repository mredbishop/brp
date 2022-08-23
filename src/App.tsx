import {
    Box,
    CssBaseline,
    styled,
    ThemeProvider,
    Typography
} from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import theme from './Theme';
import BrpGame from './views/game/BrpGame';
import Home from './views/home/Home';
import Who from './views/who/Who';

// remove when https://github.com/iamhosseindhv/notistack/issues/440 fixed
const Snackbar = styled(SnackbarProvider)`
    &.SnackbarItem-variantSuccess {
        background: ${(p) => p.theme.gradients.success.main};
    }
    &.SnackbarItem-variantError {
        background: ${(p) => p.theme.gradients.error.main};
    }
    &.SnackbarItem-variantWarning {
        background: ${(p) => p.theme.gradients.warning.main};
    }
`;

const App = () => (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <Snackbar maxSnack={5}>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Box sx={{ width: '100%', textAlign: 'center' }}>
                                <Layout>
                                    <Outlet />
                                </Layout>
                            </Box>
                        }
                    >
                        <Route path="/" element={<Home />} />
                        <Route
                            path="/brp"
                            element={
                                <BrpGame gameMode="brp" background="#ff0080" />
                            }
                        />
                        <Route
                            path="/flo"
                            element={
                                <BrpGame gameMode="flo" background="#a08800" />
                            }
                        />
                        <Route
                            path="/gro"
                            element={
                                <BrpGame gameMode="gro" background="#00970d" />
                            }
                        />
                        <Route
                            path="/kno"
                            element={
                                <BrpGame gameMode="kno" background="#0069be" />
                            }
                        />
                        <Route path="/who" element={<Who />} />
                        <Route
                            path="*"
                            element={
                                <Typography variant="h6" textAlign="center">
                                    Error Page Not Found
                                </Typography>
                            }
                        />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Snackbar>
    </ThemeProvider>
);

export default App;
