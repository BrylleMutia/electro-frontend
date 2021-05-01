import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#F9D709',
    },
    secondary: {
      main: '#0D55B4',
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 990,
      xl: 1200,
    },
  },
});

export default theme;