import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#004C3F',
    },
      secondary: {
          main: '#ff0000',
      },
      disable: {
          main: '#e1e1e1',
      },
      green: {
          main: 'green',
      },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;
