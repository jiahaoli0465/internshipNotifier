import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#bf0a0a',
    },
    secondary: {
      main: '#A37B73',
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
