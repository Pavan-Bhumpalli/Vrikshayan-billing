import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/User/Login';
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
import Bill from './components/Bill/Bill';
import LoginError from './components/LoginError';


function App() {
  return (
    <div className='bg-slate-100'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Sidebar />} />
          <Route path="/createCustomer" element={<CreateCustomer />} />
          <Route path="/loginerror" element={<LoginError />} />
          <Route path="/details" element={<Details />} />
          <Route path="/movies" element={<Movie />} />
          <Route path='/lunch' element={<Lunch />} />
          <Route path='/nursery' element={<Nursery />} />
          <Route path='/beverages' element={<Bevarages />} />
          <Route path='/billing' element={<Billing />} />
          <Route path='/bill' element={<Bill />} />
          <Route path='/diy' element={<Diy />} />
          <Route path='/adminDashboard' element={<AdminSidebar />} />
          <Route path='/statistics' element={<Statistics />} />
          <Route path='/allusers' element={<AllUsers />} />
          <Route path='/nurseryAdmin' element={<AdminActivities type={"getNurseryItems"} inp={"createNurseryItem"} del={"NurseryItem"} update={"nursery"} />} />
          <Route path='/diyAdmin' element={<AdminActivities type={"getDIYItems"} inp={"createDIYItem"} del={"diyItem"} update={"diy"} />} />
          <Route path='/bevaragesAdmin' element={<AdminActivities type={"getBeverages"} inp={"createBeverages"} del={"beverage"} update={"beverage"} />} />
          <Route path='/farmProduceAdmin' element={<AdminActivities type={"getFarmProduces"} inp={"createFarmProduce"} del={"farmProduce"} update={"farmProduce"} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;