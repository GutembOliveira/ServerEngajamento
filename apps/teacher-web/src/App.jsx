import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function App() {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Engajamento
          </Typography>
          <Button color="inherit">Questionários</Button>
          <Button color="inherit">Turmas</Button>
        </Toolbar>
      </AppBar>
    </>

  )
}
