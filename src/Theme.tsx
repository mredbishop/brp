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
      campaigns: SimplePaletteColorOptions;
      audiences: SimplePaletteColorOptions;
      templates: SimplePaletteColorOptions;
    };
    glassCards: {
      background: string;
      boxShadow: string;
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
      campaigns: SimplePaletteColorOptions;
      audiences: SimplePaletteColorOptions;
      templates: SimplePaletteColorOptions;
    };

    glassCards: {
      background: string;
      boxShadow: string;
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
        main: 'linear-gradient(117deg, rgba(187,69,233,1) 0%, rgba(233,69,129,1) 100%)',
        contrastText: '#fff'
    },
    campaigns: {
        main: 'linear-gradient(322deg, rgb(243 104 51) 0%, rgb(168 61 235) 100%)',
        contrastText: '#fffff'
    },
    audiences: {
        main: 'linear-gradient(322deg, rgb(63 51 243) 0%, rgb(168 61 235) 100%)',
        contrastText: '#ffffff'
    },
    templates: {
        main: 'linear-gradient(117deg, rgba(69,100,233,1) 0%, rgb(69 233 131) 100%)',
        contrastText: '#ffffff'
    },
    primary: {
        main: 'linear-gradient(117deg, rgb(132 69 233) 0%, rgba(69,171,233,1) 100%)',
        contrastText: '#fff'
    },
    error: {
        main: 'linear-gradient(302deg, rgb(241 22 172) 0%, rgb(235 44 13) 100%)',
        contrastText: '#fff'
    },
    warning: {
        main: 'linear-gradient(117deg, rgba(69,100,233,1) 0%, rgba(69,171,233,1) 100%)',
        contrastText: '#fff'
    },
    success: {
        main: 'linear-gradient(302deg, rgb(35 175 11) 0%, rgb(14 168 203) 100%)',
        contrastText: '#fff'
    },
    info: {
        main: 'linear-gradient(117deg, rgb(148 184 211) 0%, rgb(66 104 126) 100%)',
        contrastText: '#fff'
    }
};

const theme = responsiveFontSizes(createTheme({
    gradients,
    glassCards: {
        background:
      'linear-gradient(219deg, rgb(215 39 210 / 5%) 0%, rgb(23 69 209 / 15%) 100%)',
        boxShadow: 'inset 0px 0px 12px 1px rgb(228 101 237 / 3%)'
    },
    palette: {
        mode: 'dark',
        background: {
            default: '#03103b',
            paper: '#021041'
        },
        secondary: {
            contrastText: '#fff',
            main: '#f10989'
        },
        primary: {
            contrastText: '#fff',
            main: '#449de9'
        },
        text: {
            secondary: 'rgba(245, 245, 245, 0.8)'
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
