import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
// @ts-ignore
import '@fontsource/poppins';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, Roboto, Arial, sans-serif',
  },
  palette: {
    mode: 'light',
    background: {
      default: '#f9f9f9',   
      paper: '#ffffff',    
    },
    text: {
      primary: '#2d2d2d',   
      secondary: '#555555', 
    },
    primary: {
      main: '#1976d2',      
    },
    secondary: {
      main: '#f48fb1',      
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
