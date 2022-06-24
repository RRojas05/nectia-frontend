import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
import Roboto from "@fontsource/roboto";

const theme = responsiveFontSizes(
    createTheme({
    spacing: 4,
    typography: {
      fontFamily: [Roboto].join(','),
      h1: {
        fontSize: '5rem',
        fontFamily: 'Raleway',
      },
      h2: {
        fontSize: '3.5rem',
        fontFamily: 'Open Sans',
        fontStyle: 'bold',
      },
      h3: {
        fontSize: '2.5rem',
        fontFamily: 'Roboto',
      },
    },

    palette: {
      background: {
        default: '#009900'
      }, 
      primary: {
        main: '#3498DB'
      },
      secondary: {
        main: '#7DCEA0', 
      },
      error: {
        main: '#E74C3C'
      },
      warning: {
        main: '#F5B041',
      },
      info: {
        main: '#2E86C1 ', //gray
      },
      success: {
        main: '#28B463', //green
      },
      text: {
        primary: '#17202A ', //black
        secondary: '#4D5656', //white
      }
    }
  })
);

export default theme;
