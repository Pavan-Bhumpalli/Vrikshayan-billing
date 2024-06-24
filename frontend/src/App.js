import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Sidebar from './components/Sidebar';
import CreateCustomer from './components/CreateCustomer';
import Details from './components/Details';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Sidebar/>}/>
          <Route path="/createCustomer" element={<CreateCustomer/>}/>
          <Route path="/details" element={<Details/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;