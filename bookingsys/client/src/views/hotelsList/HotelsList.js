import React, { useContext } from 'react';
import "./hotelsList.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import Search from "../../components/search/Search";
import useFetch from "../../hooks/useFetch";
import FetchSearch from '../../hooks/FetchSearch';
import MultiRangeSlider from "../../components/multiRangeSlider/MultiRangeSlider";
import { SearchContext } from '../../context/SearchContext';

// const HotelsList = () => {
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

  //infinite scrolling
  // const batchSize = 10;
  // const [records, setRecords] = useState([]);
  // const scrollViewportRef = useRef<HTMLDivElement>(null);
  // let timeout: ReturnType<typeof setTimeout> | undefined;

  //infinite scroll
  // Clear timeout on unmount
  // useEffect(() => {
  //   return () => {
  //     if (timeout) clearTimeout(timeout);
  //   };
  // }, [timeout]);






const HotelsList = () => {
  const {uid, dest_id, date, guests, lang, currency, partner_id,} = useContext(SearchContext);
  
  //again go see how to use use States and useLocation()
  const location = useLocation();
  const [destination, setDestination] = useState(location.state.destination);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const setDate = useState(date)
  const [hotelNameFilter, setHotelNameFilter] = useState("");
 
  //@John-David-Tan this for u to edit
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(2500);
  const [minRating, setMinRating] = useState(1);
  const [maxRating, setMaxRating] = useState(5);

  const handlePriceRangeChange = ({ min, max }) => {
    setMin(min);
    setMax(max);
  };

  const handleRatingRangeChange= ({min, max}) => {
    setMinRating(min);
    setMaxRating(max);
  };






  // const batchSize = 10;
  // const [records, setRecords] = useState(data.slice(0,10));
  // const scrollViewportRef = useRef

  //let timeout: returnType<typeof setTimeout> | undefined;
  //infinite scrolling
  // const loadMoreRecords = () => {
  //   console.log(' inside load more records ', records);
  //   if (records.length < data.length) {
  //     setLoading(true);
  //     timeout = setTimeout(() => {
  //       setRecords(data.slice(0, records.length + batchSize));
  //       setLoading(false);
  //     }, 1000);
  //   }
  // };

  //reset infinite scrolling
  // const reset = () => {
  //   setRecords(data.slice(0, batchSize));
  //   // Make sure to scroll to top after resetting records
  //   scrollViewportRef.current?.scrollTo(0, 0);
  // };

  const [error, setError ] = useState(null);
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
  
    try {
      //const response = await fetch(`https://api.example.com/items?page=${page}`);
      //const data = await response.json();
      if (data) {
        setItems(prevItems => [...prevItems, ...data]);
        setPage(prevPage => prevPage + 1);
      } else {
        console.log('no data loaded yet ');
      }
      
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || loading) {
      return;
    }
    fetchData();
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading]);
  



  //const [pageNumber, setPageNumber] = useState(1);
  //const [hasMore, setHasMore] = useState(false);

  
  //this is to call the backend which calls an external api. refer to server/routes/hotels.js and also server/server.js
  useEffect( () => {
    try {
        // const sDate = format(date[0].startDate,"yyyy-MM-dd");
        // const eDate = format(date[0].endDate,"yyyy-MM-dd");
        
        fetch(`/api/hotels/prices?destination_id=${dest_id}&checkin=2023-10-07&checkout=2023-10-08&lang=${lang}&currency=${currency}&guests=${guests}&partner_id=${partner_id}`)
        .then(
            response => response.json()
        ).then(data => {
            setData(data);
            console.log("data", data);
        });
    } catch (err) {
      console.log(' use effect error');
    }
    
    }, [])
    //console.log('use effect has collected data, records ', data, records);
  

  //this is for the search bar on the hotels results page @John-David-Tan this for u to edit
  const handleClick  = () => {
    //console.log("location ,destination ", location, " ", destination);
    console.log(destination, date[0].startDate, date[0].endDate, openDate[0], options);
  };


  const sortBySearchRank = (hotelA, hotelB) => {
    // Check if both hotels have searchRank
    if (hotelA.searchRank !== undefined && hotelB.searchRank !== undefined) {
      return hotelB.searchRank - hotelA.searchRank; // Sort in descending order
    } else if (hotelA.searchRank === undefined && hotelB.searchRank !== undefined) {
      return 1; // hotelA has no searchRank, so move it to the end
    } else if (hotelA.searchRank !== undefined && hotelB.searchRank === undefined) {
      return -1; // hotelB has no searchRank, so move it to the end
    } else {
      return 0; // Both hotels have no searchRank, keep their order unchanged
    }
  };
  
  
  // Filter the hotels based on the current min and max prices
  const filteredHotels = data.filter((hotel) => {
    // Check if hotel name contains the filter input (case-insensitive)
    const isNameFiltered =
  hotel.name &&
  (hotelNameFilter.trim() === "" || hotel.name.toLowerCase().includes(hotelNameFilter.trim().toLowerCase()));

  
    // Check if hotel price is within the filter range
    const isPriceFiltered =
      hotel.price !== undefined && hotel.price >= min && hotel.price <= max;
  
    // Return true if both name and price filters match or if both filters are not applied

    const isRatingFiltered = 
      hotel.rating >= minRating && hotel.rating <= maxRating;

    return (isNameFiltered && isPriceFiltered && isRatingFiltered) ;
  });
        


  const sortedHotels = filteredHotels.sort(sortBySearchRank);



  console.log("sorted", sortedHotels)

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
                "yyyy-MM-dd" //this is the dates that will open up when u click
              )} to ${format(date[0].endDate, "yyyy-MM-dd")}`}</span>
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
            <input placeholder="Hotel"
                type="text"
                value={hotelNameFilter}
                onChange={(e) => setHotelNameFilter(e.target.value)}
            />
          </div>


          <div className="lsItem">
            <label>Price Range</label>
            <div className="priceRangeSlider">
              <MultiRangeSlider
              min={0}
              max={2500}
              onChange={handlePriceRangeChange}
            /> 
          </div>
        </div>

        <div className="lsItem">
            <label>Rating Range</label>
            <div className="ratingRangeSlider">
              <MultiRangeSlider
              min={0}
              max={5}
              onChange={handleRatingRangeChange}
            /> 
          </div>
        
        </div>


       
          
        

        <div className="listResult"  >
             {/* {loading ? (
          //     "loading" //over here is how u get a dynamic list of items, i will need to change to a load more button for now it loads 531 results which is p damn long
          //   ) : (
          //     <>
          //       {data.map((item) => (
          //         <Search  item={item} key={item.id} />
          //       ))}
          //     </>
           //  )} */}
            
            {loading ? (
                "loading" //over here is how u get a dynamic list of items, i will need to change to a load more button for now it loads 531 results which is p damn long
              ) : (
                <>
                  { 
                  items.map( (item) => (
                
                  <Search item = {item} key={item.id} />
                  ) ) 
                }
                </>
            )} 

        </div> 



        

</div>
      </div>
      <div className="listResult">
      {(() => {
    switch (true) {
      case sortedHotels.length > 0:
        return sortedHotels.map((item) => <Search item={item} key={item.id} />);

      case sortedHotels.length === 0 && loading === true:
        return <p className="hotelAvail">Loading</p>;

      case sortedHotels.length === 0 && loading === false:
        return <p className="hotelAvail">No available hotels.</p>;
        
      default:
        return <p>null</p>;
    }
  })()}
        </div>
    </div>
    </div>
    

  );
};

export default HotelsList;