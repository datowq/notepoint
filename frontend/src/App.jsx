import Register from './components/Register';
import Login from './components/Login';
import Verify from './components/Verify'
import NavBar from './components/Navbar'
import Forgot from './components/Forgot'
import Recover from './components/Recover'
import SpotifyStats from './components/SpotifyStats'
import LandingPage from './pages/Landing'
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  const [ theme, setTheme ] = useState(null);
  const [ user, setUser ] = useState(false);

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

  const handleLogin = () => {
    setUser(true);
  }

  return (
    <div className='bg-backgroundc-100 dark:bg-backgroundc-300 px-10 md:px-20 lg:px-40 min-h-screen'>
      <NavBar login={user} mode={theme} handleClick={() => handleThemeSwitch()}/>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/login' element={<Login handleLogin={handleLogin} />} />
        <Route path='/register' element={<Register />} />
        <Route path='/verify/:id' element={<Verify />} />
        <Route path='/forgot' element={<Forgot/>} />
        <Route path='/recover/:id' element={<Recover/>} />
        <Route path='/stats' element={<SpotifyStats />} />
      </Routes>
    </div>
  )
}

export default App