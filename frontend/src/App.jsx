import Register from './components/Register';
import About from './components/About';
import Login from './components/Login';
import Verify from './components/Verify'
import NavBar from './components/Navbar'
import Forgot from './components/Forgot'
import Recover from './components/Recover'
import SpotifyStats from './components/SpotifyStats'
import Discover from './components/Discover'
import LandingPage from './pages/Landing'
import ProfilePage from './pages/Profile';
import ErrorBar from './components/ErrorBar';

import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  
  const [ theme, setTheme ] = useState(null);
  const [ errorMessage, setErrorMessage ] = useState(null);

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

  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000);
  }, [errorMessage]);

  return (
    <div className='bg-backgroundc-100 dark:bg-backgroundc-300 px-10 md:px-20 lg:px-40 min-h-screen'>
      {errorMessage && <ErrorBar errorMessage={errorMessage}/>}
      <NavBar mode={theme} handleClick={() => handleThemeSwitch()}/>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/login' element={<Login setErrorMessage={setErrorMessage} />} />
        <Route path='/register' element={<Register setErrorMessage={setErrorMessage} />} />
        <Route path='/verify/:id' element={<Verify />} />
        <Route path='/forgot' element={<Forgot setErrorMessage={setErrorMessage} />} />
        <Route path='/recover/:id' element={<Recover setErrorMessage={setErrorMessage} />} />
        <Route path='/stats' element={<SpotifyStats />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/about' element={<About />} />
        <Route path='/discover' element={<Discover />} />
      </Routes>
    </div>
  )
}

export default App