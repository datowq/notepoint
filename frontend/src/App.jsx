import Register from './components/Register';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';

/*
import NavBar from './components/navbar'
import LandingPage from './pages/landing'
import { useState, useEffect } from 'react';

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
        <LandingPage/>
    </div>
  )
}

export default App
*/

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path='/notepoint/' element={<Login />} />
        <Route path='/notepoint/register' element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;