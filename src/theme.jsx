import { createTheme } from '@mui/material/styles';

const lightThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#222222',
    },
    secondary: {
      main: '#ef1717',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(0, 0, 0, 0.87)',
      secondary: 'rgba(0, 0, 0, 0.6)',
    },
    border: {
      main: '#ccc',
    },
  },
  typography: {
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    h1: { fontWeight: 'bold', lineHeight: 1.2, marginBottom: '1rem' },
    h2: { fontWeight: 'bold', lineHeight: 1.2, marginBottom: '1rem' },
    h3: { fontWeight: 'bold', lineHeight: 1.2, marginBottom: '1rem' },
    h4: { fontWeight: 'bold', lineHeight: 1.2, marginBottom: '1rem' },
    h5: { fontWeight: 'bold', lineHeight: 1.2, marginBottom: '1rem' },
    h6: { fontWeight: 'bold', lineHeight: 1.2, marginBottom: '1rem' },
    body1: { lineHeight: 1.6, marginBottom: '1rem' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--primary-color': '#222222',
          '--primary-hover-color': 'rgb(23, 23, 23)',
          '--background-color': '#fff',
          '--text-color': 'rgba(0, 0, 0, 0.87)',
          '--border-color': '#ccc',
        },
        body: {
          backgroundColor: 'var(--background-color)',
          color: 'var(--text-color)',
        },
      },
    },
  },
};

const darkThemeOptions = {
  palette: {
    mode: 'dark',
    primary: {
      main: '#ffffff',
    },
    secondary: {
      main: '#ef1717',
    },
    background: {
      default: '#121212',
      paper: '#1d1d1d',
    },
    text: {
      primary: 'rgba(255, 255, 255, 0.87)',
      secondary: 'rgba(255, 255, 255, 0.6)',
    },
    border: {
      main: '#444',
    },
  },
  typography: lightThemeOptions.typography,
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        ':root': {
          '--primary-color': '#ffffff',
          '--primary-hover-color': 'rgb(200, 200, 200)',
          '--background-color': '#121212',
          '--text-color': 'rgba(255, 255, 255, 0.87)',
          '--border-color': '#444',
        },
        body: {
          backgroundColor: 'var(--background-color)',
          color: 'var(--text-color)',
        },
      },
    },
  },
};

// Sistem temasını algılayan fonksiyon
const getSystemTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

// Sisteme uygun temayı seç
const theme = createTheme(getSystemTheme() === 'dark' ? darkThemeOptions : lightThemeOptions);

export default theme;
