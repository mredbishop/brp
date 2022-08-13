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
import Brp from './views/game/brp/Brp';
import Flo from './views/game/flo/Flo';
import Home from './views/home/Home';
import Stats from './views/stats/Stats';

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
                        <Route path="/brp" element={<Brp />} />
                        <Route path="/stats" element={<Stats />} />
                        <Route path="/flo" element={<Flo />} />
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
