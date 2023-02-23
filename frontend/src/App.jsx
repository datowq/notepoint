import Register from './components/Register';
import Login from './components/Login';
import { Routes, Route } from 'react-router-dom';

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