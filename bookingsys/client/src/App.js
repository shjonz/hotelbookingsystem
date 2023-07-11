import logo from './logo.svg';
import './App.css';
import HotelsList from "./views/hotelsList/HotelsList";
import PaymentPage from './views/paymentpage/Paymentpage';
import Completion from './components/checkout/Completion';
import Hotel from "../src/views/hotel/Hotel";

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
        <Route path = "/payment" element={<PaymentPage />}/>
        <Route path = "/completion" element={<Completion/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
