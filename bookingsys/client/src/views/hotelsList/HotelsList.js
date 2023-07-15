import React from 'react';
import "./hotelsList.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import Search from "../../components/search/Search";
import useFetch from "../../hooks/useFetch";
import FetchSearch from '../../hooks/FetchSearch';
import destdata from "../../dest.json";
import MultiRangeSlider from "../../components/multiRangeSlider/MultiRangeSlider";


const HotelsList = () => {
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [min, setMin] = useState(undefined);
  // const [max, setMax] = useState(undefined);
  console.log("location ,destination ", location, " ", destination);
  console.log(destination, date.startDate, date.endDate, options.adult);
  //const { data, loading, error, reFetch } = useFetch(
   // "https://hotelapi.loyalty.dev/api/hotels?destination_id=RsBU"
   // `/hotels?city=${destination}&min=${min || 0 }&max=${max || 999}`
  //);

  //const { data, loading, error, reFetch } = FetchSearch(
    //`/{destination}`
    //`/Singapore-Singapore/2023-10-15/2023-10-20/en_US/SGD/2/1`
  //);

  //console.log(data);

  //JDs filter search for facilities ==========================================
  const [wifiChecked, setWifiChecked] = useState(false);
  const [poolChecked, setPoolChecked] = useState(false);

  const handleWifiChange = () => {
    setWifiChecked(!wifiChecked);
  };

  const handlePoolChange = () => {
    setPoolChecked(!poolChecked);
  };

  useEffect( () => {
    setLoading(true);
    try {
      console.log(' use effet on header component ' );
         fetch('/api/hotels/prices?destination_id=WD0M&checkin=2023-10-01&checkout=2023-10-07&lang=en_US&currency=SGD&guests=2&partner_id=1')
        .then(
            response => response.json()
        ).then(data => {
            console.log('inside use effect fetch ', data);
            setData(data);
        })
    } catch (err) {
      console.log(' use effect error');
    }
    setLoading(false);
    
    }, [])
    console.log('use effect has collected data ', data);
  

  const handleClick  = () => {
    
    console.log("location ,destination ", location, " ", destination);
    console.log(destination, date[0].startDate, date[0].endDate, openDate[0], options);
  };


  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          <div className="listSearch">
            <h1 className="lsTitle">Search</h1>
            <div className="lsItem">
              <label>Destination</label>
              <input placeholder={destination} type="text" />
            </div>
            <div className="lsItem">
              <label>Check-in Date</label>
              <span onClick={() => setOpenDate(!openDate)}>{`${format(
                date[0].startDate,
                "MM/dd/yyyy"
              )} to ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
              {openDate && (
                <DateRange
                  onChange={(item) => setDate([item.selection])}
                  minDate={new Date()}
                  ranges={date}
                />
              )}
            </div>
            <div className="lsItem">
              <label>Options</label>

              <div className="lsOptions">

                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Min price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">
                    Max price <small>per night</small>
                  </span>
                  <input type="number" className="lsOptionInput" />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Adult</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.adult}
                  />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Children</span>
                  <input
                    type="number"
                    min={0}
                    className="lsOptionInput"
                    placeholder={options.children}
                  />
                </div>

                <div className="lsOptionItem">
                  <span className="lsOptionText">Room</span>
                  <input
                    type="number"
                    min={1}
                    className="lsOptionInput"
                    placeholder={options.room}
                  />
                </div>
              </div>
            </div>
            <button onClick={handleClick}>Search</button>
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
          
        

          <div className="listResult">
          {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <Search item={item} key={item.id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelsList;