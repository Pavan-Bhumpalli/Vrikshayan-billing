import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Sidebar from './components/Sidebar';
import CreateCustomer from './components/CreateCustomer';
import Details from './components/Details';
import Movie from './components/Movies';
import Lunch from './components/Lunch';

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
          <Route path="/movies" element={<Movie/>}/>
          <Route path='/lunch' element={<Lunch/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;