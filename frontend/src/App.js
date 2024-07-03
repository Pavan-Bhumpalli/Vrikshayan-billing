import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/User/Login';
import Register from './components/User/Register';
import Sidebar from './components/Sidebar';
import CreateCustomer from './components/createCustomer/CreateCustomer';
import Details from './components/Details/Details';
import Movie from './components/Movies/Movies';
import Lunch from './components/Lunch/Lunch';
import Nursery from './components/Nursery/Nursery';
import Billing from './components/FinalBilling/Billing';
import Diy from './components/DIY/Diy';
import Bevarages from "./components/Beverages/Beverages";
import AdminSidebar from './components/Admin/AdminSidebar';
import Statistics from './components/Admin/Statistics';
import AllUsers from './components/Admin/AllUsers';
import AdminActivities from './components/Admin/AdminActivities';


function App() {
  return (
    <div className='bg-slate-100'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Sidebar />} />
          <Route path="/createCustomer" element={<CreateCustomer />} />
          <Route path="/details" element={<Details />} />
          <Route path="/movies" element={<Movie />} />
          <Route path='/lunch' element={<Lunch />} />
          <Route path='/nursery' element={<Nursery />} />
          <Route path='/beverages' element={<Bevarages />} />
          <Route path='/billing' element={<Billing />} />
          <Route path='/diy' element={<Diy />} />
          <Route path='/adminDashboard' element={<AdminSidebar />} />
          <Route path='/allusers' element={<AllUsers />} /> 
          <Route path='/nurseryAdmin' element={<AdminActivities type={"getNurseryItems"} inp={"createNurseryItem"}/>}/>
          <Route path='/diyAdmin' element={<AdminActivities type={"getDIYItems"} inp={"createDIYItem"}/>}/>
          <Route path='/bevaragesAdmin' element={<AdminActivities type={"getBeverages"}  inp={"createBeverages"}/>}/>
          <Route path='/farmProduceAdmin' element={<AdminActivities type={"getFarmProduces"} inp={"createFarmProduce"}/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;