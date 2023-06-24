import logo from './logo.svg';
import './App.css';
import HotelsList from "./views/hotelsList/HotelsList";

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
        <Route path = "/" element={<Home></Home>}/>
        <Route path = "/hotels" element={<HotelsList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
