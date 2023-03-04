import Register from './components/Register';
import Login from './components/Login';
import Verify from './components/Verify'
import NavBar from './components/Navbar'
import Forgot from './components/Forgot'
import Recover from './components/Recover'
import LandingPage from './pages/Landing'
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [ theme, setTheme ] = useState(null);

  useEffect(() => {
    if(window.matchMedia('(prefers-color-scheme: dark)').
    matches) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if(theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className='bg-backgroundc-100 dark:bg-backgroundc-300 px-10 md:px-20 lg:px-40 min-h-screen'>
      <NavBar mode={theme} handleClick={() => handleThemeSwitch()}/>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verify/:id' element={<Verify />} />
        <Route path='/forgot' element={<Forgot/>} />
        <Route path='/recover/:id' element={<Recover/>} />
      </Routes>
    </div>
  )
}

export default App