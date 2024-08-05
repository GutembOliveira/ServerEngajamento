import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// import TabPanel from '@mui/lab/TabPanel';

import Quizzes from '../screens/Quizzes';
import Classes from '../screens/Classes';

export default function HeaderNav() {
  const [value, setValue] = useState('quizzes');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <AppBar position="static" component="nav">
      <Toolbar>
        <Typography variant="h6">
          Engajamento
        </Typography>

        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Questionários" value="quizzes" />
          <Tab label="Turmas" value="classes" />
        </Tabs>

        {/* <Button color="inherit" component={Link} to='/quizzes'>Questionários</Button>
        <Button color="inherit" component={Link} to='/classes'>Turmas</Button> */}
      </Toolbar>

      {/* <TabPanel value="quizzes">{Quizzes}</TabPanel>
      <TabPanel value="classes">{Classes}</TabPanel> */}
    </AppBar>
  )
}