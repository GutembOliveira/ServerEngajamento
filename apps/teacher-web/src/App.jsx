import { Route, Routes } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import Home from './pages/Home';
import Quizzes from './pages/Quizzes';
import Classes from './pages/Classes';
import ResponsiveAppBar from './components/ResponsiveAppBar';

export default function App() {
  return (
    <div className="App">
      <CssBaseline/>

      <ResponsiveAppBar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Quizzes" element={<Quizzes />} />
        <Route path="Classes" element={<Classes />} />


      </Routes>
    </div>
  )
}
