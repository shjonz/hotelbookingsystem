import logo from './logo.svg';
import './App.css';
import HotelsList from "./views/hotelsList/HotelsList";
import PaymentPage from './views/paymentpage/Paymentpage';
import Completion from './components/checkout/Completion';
import Hotel from "../src/views/hotel/Hotel";
import Register from './views/register/Register';
import Login from './views/login/Login';
import Profile from './views/profile/Profile';
import GuestInfo from './components/guestInfo/guestInfo';


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Home from "./views/home/Home";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path = "/" element={<Home/>}/>
        <Route path = "/hotels" element={<HotelsList/>}/>
        <Route path = "/payment" element={<PaymentPage  />}/>
        <Route path = "/completion" element={<Completion/>}/>
        <Route path = "/hotels/:id" element={<Hotel/>}/>
        <Route path = "/profile" element={<Profile />} />
        <Route path = "/login" element = {<Login />} />
        <Route path = "/register" element = {<Register />} />
        <Route path="/guestInfo" component={GuestInfo} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
