import "./List.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MultiRangeSlider from "../../components/multiRangeSlider/MultiRangeSlider";
import { SearchItem } from "../../components/searchItem/searchItem";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { DateRange } from "react-date-range";
import {format} from "date-fns";




const List = () => {

  const [wifiChecked, setWifiChecked] = useState(false);
  const [poolChecked, setPoolChecked] = useState(false);

  const handleWifiChange = () => {
    setWifiChecked(!wifiChecked);
  };

  const handlePoolChange = () => {
    setPoolChecked(!poolChecked);
  };

  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date,setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);

  return (
    <div>
      <Navbar />
      <Header  type="list"/>
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearchContainer">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
            <label>Destination</label>
            <input placeholder={destination} type="text"/>
          </div>
          <div className="lsItem">
            <label>Check-in Date</label>
            <span onClick={()=>setOpenDate(!openDate)}>{`${format(date[0].startDate, "dd/MM/yyyy")} to 
            ${format(date[0].endDate, "dd/MM/yyyy")}`}</span>
        {openDate && (   <DateRange onChange={(item) => setDate([item.selection])} 
            minDate={new Date()}
            ranges={date}/>)}
          </div>
          <div className="lsItem">
            <label>Options</label>
            <div className="lsOptions">


            <div className="lsOptionItem">
              <span className="lsOptionText">Adult</span>
              <input type="number" min={1} className="lsOptionInput" placeholder={options.adult}/>
            </div>
            <div className="lsOptionItem">
              <span className="lsOptionText">Children</span>
              <input type="number" min={0} className="lsOptionInput" placeholder={options.children}/>
            </div>
            <div className="lsOptionItem">
              <span className="lsOptionText">Room</span>
              <input type="number" min={1} className="lsOptionInput" placeholder={options.room}/>
            </div>
          </div>
          </div>
          <button>Search</button>
          </div>

          <div className="listFilter">
            <h1 className="lsTitle">Filter</h1>
            <div className="lsItem">
            <label>Hotel</label>
            <input placeholder="Hotel" type="text"/>
          </div>

          <div className="lsItem">
            <label>Price Range</label>
            <div className="priceRangeSlider">
            <MultiRangeSlider
      min={1}
      max={1000}
      onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
    /> 
            </div>
          </div>
          <div className="lsItem">
            <div className="checkboxes">
            <label>Amenities</label>
            <label htmlFor="wifi">
        <input
          type="checkbox"
          id="wifi"
          checked={wifiChecked}
          onChange={handleWifiChange}
        />
        Free Wifi
      </label>
      <label htmlFor="pool">
        <input
          type="checkbox"
          id="pool"
          checked={poolChecked}
          onChange={handlePoolChange}
        />
        Swimming Pool
      </label>
      </div>
          </div>
          </div>
          </div>





          <div className="listResult">
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
            <SearchItem/>
          </div>
          </div>
        </div>
      </div>

  )
}

export default List