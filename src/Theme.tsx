import {
    createTheme, responsiveFontSizes, SimplePaletteColorOptions
} from '@mui/material/styles';

declare module '@mui/material/styles' {
  // eslint-disable-next-line no-unused-vars
 interface Theme {
    gradients: {
      secondary: SimplePaletteColorOptions;
      primary: SimplePaletteColorOptions;
      error: SimplePaletteColorOptions;
      warning: SimplePaletteColorOptions;
      success: SimplePaletteColorOptions;
      info: SimplePaletteColorOptions;
    };
    glassCards: {
      primaryBackground: string;
      secondaryBackground: string;
    };
    snackbar: {
      variantSuccess: { background: string; color: string };
      variantError: { background: string; color: string };
      variantWarning: { background: string; color: string };
      variantInfo: { background: string; color: string };
    };
  }
  // allow configuration using `createTheme`

  // eslint-disable-next-line no-unused-vars
  interface ThemeOptions {
    gradients: {
      secondary: SimplePaletteColorOptions;
      primary: SimplePaletteColorOptions;
      error: SimplePaletteColorOptions;
      warning: SimplePaletteColorOptions;
      success: SimplePaletteColorOptions;
      info: SimplePaletteColorOptions;
    };

    glassCards: {
        primaryBackground: string;
        secondaryBackground: string;
    };
    snackbar: {
      variantSuccess: { background: string; color: string };
      variantError: { background: string; color: string };
      variantWarning: { background: string; color: string };
      variantInfo: { background: string; color: string };
    };
  }
}

const gradients = {
    secondary: {
        main: 'linear-gradient(117deg, #440117 0%, #5a011f 100%)',
        contrastText: '#fff'
    },
    primary: {
        main: 'linear-gradient(117deg, #0c6400 0%, #129900 100%)',
        contrastText: '#fff'
    },
    error: {
        main: 'linear-gradient(302deg, #003c64 0%, #006bb3 100%)',
        contrastText: '#fff'
    },
    warning: {
        main: 'linear-gradient(117deg, #6700ac 0%, #360b00 100%)',
        contrastText: '#fff'
    },
    success: {
        main: 'linear-gradient(302deg, #007e06 0%, #003a03 100%)',
        contrastText: '#fff'
    },
    info: {
        main: 'linear-gradient(117deg, #94b8d3 0%, #42687e 100%)',
        contrastText: '#fff'
    }
};

const theme = responsiveFontSizes(createTheme({
    typography: {
        fontFamily: 'Righteous,cursive'
    },
    gradients,
    glassCards: {
        primaryBackground: 'linear-gradient(210deg, #001320 0%, #003c64 50%, #006bb3 100%)',
        secondaryBackground: 'linear-gradient(210deg, #031600 0%, #0c6400 50%, #129900 100%)'
    },
    palette: {
        mode: 'dark',
        background: {
            default: '#242424',
            paper: '#222222'
        },
        secondary: {
            contrastText: '#fff',
            main: '#004faf'
        },
        primary: {
            contrastText: '#000000',
            main: '#0c6b00'
        },
        text: {
            secondary: '#dadada'
        }
    },
    shape: {
        borderRadius: 6
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536
        }
    },
    snackbar: {
        variantSuccess: {
            background: gradients.success.main,
            color: gradients.success.contrastText
        },
        variantError: {
            background: gradients.error.main,
            color: gradients.error.contrastText
        },
        variantWarning: {
            background: gradients.warning.main,
            color: gradients.warning.contrastText
        },
        variantInfo: {
            background: gradients.info.main,
            color: gradients.info.contrastText
        }
    }
}));

export default theme;
