import React from 'react';
import "./hotelsList.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef, useCallback } from "react";
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
  const observer = useRef(); //need to get reference to last element, 
  //useRef not part of our state, so it doesnt update every time state changes, so when our reference changes, it doesnt actly rerun our component, so we need useCallback
  const lastElementRef = useCallback( node => {
    if (loading) return 
    if (observer.current) observer.current.disconnect() 
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage
      }
    })
    if (node ) observer.current.observe(node)

    //this is wtv current iteration of tat variable is, so if we hv an observer wat we do is disconnect the observer from the prev element, so our new last element 
    //will be hooked up correctly coz we gonna reconnect it
    console.log(' hotels list inside use callback ', node)
  }, loading, hasMore );

  const batchSize = 100;
  const [records, setRecords] = useState(employees.slice(0, batchSize));


  //again go see how to use use States and useLocation()
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [date, setDate] = useState(location.state.date);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [data, setData] = useState([]);
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

  //infinite scrolling
  const loadMoreRecords = () => {
    if (records.length < employees.length) {
      setLoading(true);
      timeout = setTimeout(() => {
        setRecords(employees.slice(0, records.length + batchSize));
        setLoading(false);
      }, 1000);
    }
  };

  //reset infinite scrolling
  const reset = () => {
    setRecords(employees.slice(0, batchSize));
    // Make sure to scroll to top after resetting records
    scrollViewportRef.current?.scrollTo(0, 0);
  };



  
    const postsData = async () => {

        // Till the data is fetch using API 
        // the Loading page will show.
        //setLoading(true);

        // Await make wait until that 
        // promise settles and return its result
    const location = destination;
    const checkin = "2023-10-15";
    const checkout = "2023-10-16";
    const lang = "en_US";
    const guests = "2";
    const partner_id = "1";
    const currency = "SGD";
    
    
    //const destin = destdata.find(dest => dest.term === location);
    const destin = destdata.find(
      (dest) => dest.term.toLowerCase() === location.toLowerCase()
    );
    //const destin = destdata.filter( (dest) => dest.term.includes(location));
    console.log(' data inside handle click ', location, checkin, checkout, lang, guests, partner_id, currency);
    console.log(' inside handleclick ', destin);
    if (!destin) {
        //res.status(404).send('No destination found for the specified location.');
        console.log("error in destin");
        return;
    }
    const response = await fetch(`https://hotelapi.loyalty.dev/api/hotels?destination_id=${destin.uid}`);
    if (!response.ok) {
      console.log("error in response ")
      //console.error(`Error fetching hotel list: ${response2.status} ${response2.statusText}`);
      //res.status(500).send('An error occurred while processing your request.');
      return;
    }
    const hotelData = await response.json();
  //console.log("okay");

    let country_code;
      if (hotelData.length > 0) {
        country_code = hotelData[0].original_metadata.country;
      } else {
        console.error('No hotels found for the specified destination.');
        //res.status(404).send('No hotels found for the specified destination.');
        return;
      }
  const hotels = hotelData.map(hotel => ({
      id: hotel.id,
      name: hotel.name,
      address: hotel.address,
      latitude: hotel.latitude,
      longitude: hotel.longitude,
      image: hotel.image_details ? hotel.image_details.prefix + hotel.image_details.suffix : null,
      rating: hotel.rating,
      country: hotel.original_metadata.country,
  }));
  //console.log(hotelData.length);
// console.log(hotelData[0].original_metadata);
// console.log(hotelData[0].original_metadata.country);
// console.log(country_code);

  // Fetch prices from second prices API
  const response2 = await fetch(`https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${destin.uid}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&country_code=${country_code}&guests=${guests}&partner_id=1`);
  if (!response2.ok) {
      console.error(`Error fetching hotel list: ${response2.status} ${response2.statusText}`);
      //res.status(500).send('An error occurred while processing your request.');
      return;
  }
  const hotelprices = await response2.json();
  if (hotelprices.hotels.length === 0) {
      console.log("error no hotels found for the categrory ")
      //res.status(404).send('No hotels found for the specified search criteria.');
      return;
  }
  const extractedHotelprices = hotelprices.hotels.map(hotel => ({
      id: hotel.id,
      searchRank: hotel.searchRank,
      price: hotel.price,
      market_rates: hotel.market_rates,
  }));
  console.log("okay");


  // Combine the data from the two APIs
  const combinedData = hotels.map(hotel => {
      const priceData = extractedHotelprices.find(price => price.id === hotel.id);
      return {
          ...hotel,
          ...priceData
      };
  });
  // Send data containing hotels - So far only tested for Singapore 
  //res.send(combinedData);
  console.log(combinedData);
  setData(combinedData);

        // After fetching data stored it in posts state.
        //setPosts(response.data);

        // Closed the loading page
        //setLoading(false);
    }

  const handleClick  = () => {
    postsData();
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
          {/* {loading ? (
              "loading" //over here is how u get a dynamic list of items, i will need to change to a load more button for now it loads 531 results which is p damn long
            ) : (
              <>
                {data.slice(0, 15).map( (item, index) => (
                  
                  <Search ref={lastElementRef} item={item} key={item.id} />
                ))}
              </>
            )} */}

            {loading ? (
              "loading" //over here is how u get a dynamic list of items, i will need to change to a load more button for now it loads 531 results which is p damn long
            ) : (
              <>
                {data.map( (item, index) => {
                  if (item.length === index + 1) {
                    return <Search ref={lastElementRef} item={item} key={item.id} />
                  } else {
                    return <Search item={item} key={item.id} />
                  }
                }
                )}
              </>
            )}

          </div>

        </div>

      </div>
      
    </div>
  );
};

export default HotelsList;