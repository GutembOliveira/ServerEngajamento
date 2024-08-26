import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import PersistentDrawerLeft from './components/PersistentDrawerLeft';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline/>

      <PersistentDrawerLeft/>

      
    </ThemeProvider>
  
  )
}
