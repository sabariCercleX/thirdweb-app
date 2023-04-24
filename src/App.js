import { BrowserRouter } from 'react-router-dom';
import "./styles/Home.css";
import Router from './routes/routes';
import { ThemeProvider } from '@mui/material';
import darkTheme from './theme/theme';

export default function Home() {
  return (
    <div>
      <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
      <Router/>
      </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}
