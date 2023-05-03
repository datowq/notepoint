import Register from './pages/Register';
import About from './pages/About';
import Login from './pages/Login';
import Verify from './pages/Verify'
import NavBar from './components/Navbar'
import Forgot from './pages/Forgot'
import Recover from './pages/Recover'
import SpotifyStats from './pages/SpotifyStats'
import Discover from './pages/Discover'
import LandingPage from './pages/Landing'
import ProfilePage from './pages/Profile';
import ErrorBar from './components/ErrorBar';
import SuccessBar from './components/SuccessBar';

import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

function App() {
  
  const [ theme, setTheme ] = useState(null);
  const [ errorMessage, setErrorMessage ] = useState(null);
  const [ successMessage, setSuccessMessage ] = useState(null);

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

  useEffect(() => {
    setTimeout(() => {
      setSuccessMessage(null)
    }, 3000);
  }, [successMessage]);

  return (
    <div className='bg-backgroundc-100 dark:bg-backgroundc-300 min-h-screen min-w-full'>
      <div className='px-10 md:px-20 lg:px-40'>
        <div className='fixed top-0 z-50 inset-x-0'>
          {errorMessage && <ErrorBar errorMessage={errorMessage}/>}
          {successMessage && <SuccessBar successMessage={successMessage} />}
        </div>
        <NavBar mode={theme} handleClick={() => handleThemeSwitch()}/>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/login' element={<Login setErrorMessage={setErrorMessage} />} />
          <Route path='/register' element={<Register setErrorMessage={setErrorMessage} />} />
          <Route path='/verify/:id' element={<Verify />} />
          <Route path='/forgot' element={<Forgot setErrorMessage={setErrorMessage} />} />
          <Route path='/recover/:id' element={<Recover setErrorMessage={setErrorMessage} />} />
          <Route path='/stats' element={<SpotifyStats />} />
          <Route path='/discover' element={<Discover />} />
          <Route path='/about' element={<About />} />
          <Route path='/profile' element={<ProfilePage setErrorMessage={setErrorMessage} setSuccessMessage={setSuccessMessage}/>} />
        </Routes>
      </div>
      <footer className='font-dmsans dark:text-white opacity-50 flex justify-center pb-12'>
        <small>
        the notepoint team &copy; {new Date().getFullYear()}
        </small>
      </footer>
    </div>
  )
}

export default App