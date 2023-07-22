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
  //useRef is a value that persists after each render becoz inside react every single thing we do is only stored inside that render unless its part of our state
  //if we wanna store sth btwn renders tat isnt part of our state, need to useRef, gd for storing references to elements
  // const observer = useRef(); //need to get reference to last element, 
  // //useRef not part of our state, so it doesnt update every time state changes, so when our reference changes, it doesnt actly rerun our component, so we need useCallback
  // const lastElementRef = useCallback( node => {
  //   if (loading) return 
  //   if (observer.current) observer.current.disconnect() 
  //   observer.current = new IntersectionObserver(entries => {
  //     if (entries[0].isIntersecting && hasMore) {
  //       setPage
  //     }
  //   })
  //   if (node ) observer.current.observe(node)

  //   //this is wtv current iteration of tat variable is, so if we hv an observer wat we do is disconnect the observer from the prev element, so our new last element 
  //   //will be hooked up correctly coz we gonna reconnect it
  //   console.log(' hotels list inside use callback ', node)
  // }, loading, hasMore );

  // const batchSize = 100;
  // const [records, setRecords] = useState(employees.slice(0, batchSize));


  //again go see how to use use States and useLocation()
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dest_id, setDestID] = useState(location.state.dest_id);

  //@John-David-Tan this for u to edit
  // const [min, setMin] = useState(undefined);
  // const [max, setMax] = useState(undefined);

  //this is just to check that my data from localhost:3000 when i press the search bar, information should carry over, if it doesnt means somethings wrong
  console.log("location ,destination ", location, " ", destination, " ", dest_id);
  console.log(' check dates ', destination, date[0].startDate, date[0].endDate, options.adult);

  //JDs filter search for facilities ==========================================
  const [wifiChecked, setWifiChecked] = useState(false);
  const [poolChecked, setPoolChecked] = useState(false);

  //this happens when u click the checkbox
  const handleWifiChange = () => {
    setWifiChecked(!wifiChecked);
  };

  //this happens when u click the checkbox
  const handlePoolChange = () => {
    setPoolChecked(!poolChecked);
  };

  // //infinite scrolling
  // const loadMoreRecords = () => {
  //   if (records.length < employees.length) {
  //     setLoading(true);
  //     timeout = setTimeout(() => {
  //       setRecords(employees.slice(0, records.length + batchSize));
  //       setLoading(false);
  //     }, 1000);
  //   }
  // };

  // //reset infinite scrolling
  // const reset = () => {
  //   setRecords(employees.slice(0, batchSize));
  //   // Make sure to scroll to top after resetting records
  //   scrollViewportRef.current?.scrollTo(0, 0);
  // };



  

  //this is to call the backend which calls an external api. refer to server/routes/hotels.js and also server/server.js
  useEffect( () => {
    setLoading(true);
    
    try {
        const start_date = format(date[0].startDate,"yyyy-MM-dd");
        const end_date = format(date[0].endDate,"yyyy-MM-dd");
        console.log(' use effet on header component ' , start_date, end_date);
         //fetch(`/api/hotels/prices?destination_id=${dest_id}&checkin=2023-10-01&checkout=2023-10-07&lang=en_US&currency=SGD&guests=2&partner_id=1`)
         fetch(`/api/hotels/prices?destination_id=${dest_id}&checkin=${start_date}&checkout=${end_date}&lang=en_US&currency=SGD&guests=2&partner_id=1`)
        .then(
            response => response.json()
        ).then(data => {
            console.log('inside use effect fetch ', data);
            setData(data);
        });
    } catch (err) {
      console.log(' use effect error');
    }
    setLoading(false);
    
    }, [])
    console.log('use effect has collected data ', data);
  

  //this is for the search bar on the hotels results page @John-David-Tan this for u to edit
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
                "MM/dd/yyyy" //this is the dates that will open up when u click
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
            <button //this is the search enginer at the side
            onClick={handleClick}>Search</button>
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
              "loading" //over here is how u get a dynamic list of items, i will need to change to a load more button for now it loads 531 results which is p damn long
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