import { BrowserRouter } from 'react-router-dom';
import "./styles/Home.css";
import Router from './routes/routes';
import { ThemeProvider } from '@mui/material';
import darkTheme from './theme/theme';

import { SnackbarProvider } from 'notistack';

export default function Home() {
  return (
    <div>
      <SnackbarProvider>
      <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
      <Router/>
      </BrowserRouter>
      </ThemeProvider>
      </SnackbarProvider>
    </div>
  );
}
