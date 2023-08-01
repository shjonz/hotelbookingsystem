import React, { useContext } from "react";
import "./hotelsList.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useState, useEffect, useMemo } from "react";
import { format } from "date-fns";
import Search from "../../components/search/Search";
import MultiRangeSlider from "../../components/multiRangeSlider/MultiRangeSlider";
import { SearchContext } from "../../context/SearchContext";
import InfiniteScroll from "react-infinite-scroll-component";


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
        
    } catch (err) {
      console.log(" use effect error");
    }
    setLoading(false);
    setDataSource([]);
    setHasMore(true);
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

 
  const memoizedFilteredHotels = useMemo(() => {
    return data.filter((hotel) => {
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

  // Check if hotel rating is within the filter range
  const isRatingFiltered =
  hotel.rating >= minRating && hotel.rating <= maxRating;  

  // Return true if all filters match or if filters are not applied
  return isNameFiltered && isPriceFiltered && isRatingFiltered;
    });
  }, [data, min, max, hotelNameFilter, minRating, maxRating]);

  const sortedHotels = memoizedFilteredHotels.sort(sortBySearchRank);

  //this shit causes error
  //setDataSource(sortedHotels.slice(0, batchSize));
  console.log("dataSource", dataSource);

  useEffect(() => {
    
    try {
      setDataSource([])
      setHasMore(true)
    } catch (err) {
      console.log(" inf scrolling use effect error");
    }
   
  }, [memoizedFilteredHotels]);

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
                  loader={<p>Scroll to load more hotels.</p>}
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
