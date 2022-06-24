import { ThemeProvider } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import './App.css';

import About from './pages/About';
import Games from './pages/Games';
import Login from './pages/Login';
import Register from './pages/Register';

import Navbar from './pages/components/global/NavBar';

import theme from './theme';


function App() {
  return (
    <div>
        <Navbar/>
        <Routes>
        <Route path='/' element={<Games/>} />
             <Route path='/games' element={<Games/>} />
             <Route path="/login" element={<Login />} />
             <Route path="/register" element={<Register/>} />
        </Routes>
    </div>
  );
}

export default App;
