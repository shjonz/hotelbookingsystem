import React, { useContext } from "react";
import "./hotelsList.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import Search from "../../components/search/Search";
import useFetch from "../../hooks/useFetch";
import FetchSearch from "../../hooks/FetchSearch";
import MultiRangeSlider from "../../components/multiRangeSlider/MultiRangeSlider";
import { SearchContext } from "../../context/SearchContext";
import InfiniteScroll from "react-infinite-scroll-component";

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
export const sortBySearchRank = (hotelA, hotelB) => {
  // Check if both hotels have searchRank
  if (hotelA.searchRank !== undefined && hotelB.searchRank !== undefined) {
    return hotelB.searchRank - hotelA.searchRank; // Sort in descending order
  } else if (
    hotelA.searchRank === undefined &&
    hotelB.searchRank !== undefined
  ) {
    return 1; // hotelA has no searchRank, so move it to the end
  } else if (
    hotelA.searchRank !== undefined &&
    hotelB.searchRank === undefined
  ) {
    return -1; // hotelB has no searchRank, so move it to the end
  } else {
    return 0; // Both hotels have no searchRank, keep their order unchanged
  }
};

const HotelsList = () => {
  const {dispatch} = useContext(SearchContext);
  //searchContext
  const {
    uid,
    dest_id,
    date,
    guests,
    lang,
    currency,
    partner_id,
    destination,
  } = useContext(SearchContext);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //infinite scrolling params
  const batchSize = 10;
  const [dataSource, setDataSource] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  //filter params
  const [hotelNameFilter, setHotelNameFilter] = useState("");
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(2500);
  const [minRating, setMinRating] = useState(1);
  const [maxRating, setMaxRating] = useState(5);

  //filter handlers
  const handlePriceRangeChange = ({ min, max }) => {
    setMin(min);
    setMax(max);
  };

  const handleRatingRangeChange = ({ min, max }) => {
    setMinRating(min);
    setMaxRating(max);
  };

  // const batchSize = 10;
  // const [records, setRecords] = useState(data.slice(0,10));
  // const scrollViewportRef = useRef

  //let timeout: returnType<typeof setTimeout> | undefined;
  //infinite scrolling
  const loadMoreRecords = () => {
    const remainingHotels = sortedHotels.length - dataSource.length;
    if (remainingHotels > 0) {
      const nextBatchSize = Math.min(batchSize, remainingHotels);
      setDataSource(sortedHotels.slice(0, dataSource.length + nextBatchSize));
    }
    else {
      setHasMore(false);
    }
  };
  

  //reset infinite scrolling
  // const reset = () => {
  //   setRecords(data.slice(0, batchSize));
  //   // Make sure to scroll to top after resetting records
  //   scrollViewportRef.current?.scrollTo(0, 0);
  // };

  //this is to call the backend which calls an external api. refer to server/routes/hotels.js and also server/server.js
  useEffect(() => {
    setLoading(true);
    try {
      const sDate = format(date[0].startDate, "yyyy-MM-dd");
      const eDate = format(date[0].endDate, "yyyy-MM-dd");
      fetch(
        // `/api/hotels/prices?destination_id=${dest_id}&checkin=2023-10-08&checkout=2023-10-09&lang=${lang}&currency=${currency}&guests=${guests}&partner_id=${partner_id}`
        `/api/hotels/prices?destination_id=${dest_id}&checkin=${sDate}&checkout=${eDate}&lang=${lang}&currency=${currency}&guests=${guests}&partner_id=${partner_id}`
      )
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
        setDataSource([]);
        setHasMore(true);
    } catch (err) {
      console.log(" use effect error");
    }
    setLoading(false);
  }, [useContext(SearchContext)]);
  //console.log('use effect has collected data, records ', data, records);

  const sortBySearchRank = (hotelA, hotelB) => {
    // Check if both hotels have searchRank
    if (hotelA.searchRank !== undefined && hotelB.searchRank !== undefined) {
      return hotelB.searchRank - hotelA.searchRank; // Sort in descending order
    } else if (
      hotelA.searchRank === undefined &&
      hotelB.searchRank !== undefined
    ) {
      return 1; // hotelA has no searchRank, so move it to the end
    } else if (
      hotelA.searchRank !== undefined &&
      hotelB.searchRank === undefined
    ) {
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
      (hotelNameFilter.trim() === "" ||
        hotel.name
          .toLowerCase()
          .includes(hotelNameFilter.trim().toLowerCase()));

    // Check if hotel price is within the filter range
    const isPriceFiltered =
      hotel.price !== undefined && hotel.price >= min && hotel.price <= max;

    // Return true if both name and price filters match or if both filters are not applied

    const isRatingFiltered =
      hotel.rating >= minRating && hotel.rating <= maxRating;

    return isNameFiltered && isPriceFiltered && isRatingFiltered;
  });

  // console.log("filtered", filteredHotels);
  const sortedHotels = filteredHotels.sort(sortBySearchRank);
  console.log("sorted", sortedHotels);


  let timeout;
  //this shit causes error
  //setDataSource(sortedHotels.slice(0, batchSize));
  console.log("dataSource", dataSource);

  return (
    <div className="hotelList">
      <Navbar />

      <div className="listContainer">
        <div className="listWrapper">
          <Header type="list"/>
          <div className="listFilter">
            <h1 className="lsTitle">Filter</h1>
            <div className="lsItem">
              <label>Hotel</label>
              <input
                placeholder="Hotel"
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
          </div>
        </div>

        {/* <div className="listResult"  >
             { {loading ? (
          //     "loading" //over here is how u get a dynamic list of items, i will need to change to a load more button for now it loads 531 results which is p damn long
          //   ) : (
          //     <>
          //       {data.map((item) => (
          //         <Search  item={item} key={item.id} />
          //       ))}
          //     </>
           //  )} } }
            { <InfiniteScroll dataLength={dataSource.length} next={loadMoreRecords} hasMore={hasMore} loader={<p>Loading..</p>} endMessage={<p>You are at the end!</p>} >
              {loading ? (
                "loading" //over here is how u get a dynamic list of items, i will need to change to a load more button for now it loads 531 results which is p damn long
                ) : (
                  <>
                    { 
                    dataSource.map( (item) => (
                
                    <Search item = {item} key={item.id} />
                    ) ) 
                  }
                  </>
                )} 
            </InfiniteScroll>}
           </div> */}

        <div className="listResult">
          {(() => {
            if (loading || data.length === 0) {
              // Display "Loading" while data is being fetched
              return <p className="hotelAvail">Loading</p>;
            } else if (sortedHotels.length > 0) {
              // Display the list of hotels if there are hotels available
              return (
                <InfiniteScroll
                  dataLength={dataSource.length}
                  next={loadMoreRecords}
                  hasMore={hasMore}
                  loader={<p>Loading..</p>}
                  endMessage={<p>No more available hotels.</p>}
                >
                      {dataSource.map((item) => (
                        <Search item={item} key={item.id} />
                      ))}
                    </InfiniteScroll>
                  )
                } else if (!sortedHotels.length) {
              // Display "No available hotels" if there are no hotels available
              return <p className="hotelAvail">No available hotels.</p>;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default HotelsList;
