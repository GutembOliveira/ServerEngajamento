import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function HeaderNav(){
    return(
        <AppBar position="static" component="nav">
        <Toolbar>
          <Typography variant="h6">
            Engajamento
          </Typography>
          <Button color="inherit" component={Link} to='/quizzes'>Questionários</Button>
          <Button color="inherit" component={Link} to='/classes'>Turmas</Button>
        </Toolbar>
      </AppBar>
    )
}