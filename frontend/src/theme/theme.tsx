import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#bf0a0a',
    },
  },
  components: {
    MuiButton: {
    //   styleOverrides: {
    //     root: {
    //       '&:hover': {
    //         backgroundColor: '#a00a0a',
    //       },
    //     },
    //   },
    },
  },
});

export default theme;