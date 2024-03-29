import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Hotel.css";
import { HotelRoom } from "../../components/hotelRoom/HotelRoom";
import React, { useRef, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { SearchContext } from "../../context/SearchContext";
import { Carousel } from "../../components/carousel/Carousel";


const Hotel = () => {
  const { uid, dest_id, date, guests, lang, currency, partner_id, price } =
    useContext(SearchContext);

  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [hotelid, setHotelID] = useState("");
  

  const openGoogleMaps = (address) => {
    const mapUrl = `https://www.google.com/maps/place/${address}`;
    window.open(mapUrl, "_blank");
  };

  useEffect(() => {
    setLoading(true);
    try {

      const sDate = format(date[0].startDate, "yyyy-MM-dd");
      const eDate = format(date[0].endDate, "yyyy-MM-dd");

      const url1 = `/api/hotels/default/${uid}`;
      const fetchFile1 = fetch(url1);

      // const url2 = `/api/hotels/price?uid=${uid}&destination_id=${dest_id}&checkin=2023-10-08&checkout=2023-10-09&lang=${lang}&currency=${currency}&guests=${guests}&partner_id=${partner_id}`
      const url2 = `/api/hotels/price?uid=${uid}&destination_id=${dest_id}&checkin=${sDate}&checkout=${eDate}&lang=${lang}&currency=${currency}&guests=${guests}&partner_id=${partner_id}`;

      const fetchFile2 = fetch(url2);

      Promise.all([fetchFile1, fetchFile2])
        .then((responses) => Promise.all(responses.map((res) => res.json())))
        .then((data) => {
          const [file1Data, file2Data] = data;
          setData1(file1Data);
          setData2(file2Data);
          console.log("Data from file 1:", file1Data);
          console.log("Data from file 2:", file2Data);
        });
    } catch (err) {
      console.log(" use effect error");
    }
    setLoading(false);
  }, []);


  const roomListRef = useRef(null);

  const scrollToRoomList = () => {
    roomListRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const renderedHTML = (
    <div dangerouslySetInnerHTML={{ __html: data1.description }} />
  );
  const getBarColor = (score) => {
    // Calculate the hue value based on the score (0 to 100)
    const hue = (score / 100) * 120; // Green = 120°, Red = 0°
    // Convert hue to an RGB color
    const rgbColor = `hsl(${hue}, 100%, 50%)`;
    return rgbColor;
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        "loading"
      ) : (
        <div className="hotelContainer">
          <div className="hotelWrapper">
            <button className="bookNow" onClick={scrollToRoomList}>
              Book Now
            </button>
            <h1 className="hotelTitle">{data1.name}</h1>
            <div className="hotelAddress">
              <span onClick={() => openGoogleMaps(data1.address)}>
                {data1.address}
              </span>
            </div>
            <div className="hotelImages">
              <Carousel data = {data1}/>
            </div>
            <div className="hotelDetails">
              <div className="hotelDetailsTexts">
                <h1 className="hotelDescTitle">Hotel Description</h1>
                <p className="hotelDesc">{renderedHTML}</p>
              </div>
              <div className="hotelDetailsExtra">
                <h1>Amenities</h1>
                <div className="hotelAmenities">
                  {data1.amenities_ratings &&
                  data1.amenities_ratings.length > 0 ? (
                    data1.amenities_ratings.map((amenity, index) => (
                      <div key={index}>
                        <p className="hotelAmenity">
                          {amenity.name}: {amenity.score}
                        </p>
                        <div
                          className="ratingBar"
                          style={{
                            width: `${amenity.score}%`,
                            backgroundColor: getBarColor(amenity.score),
                          }}
                        />
                      </div>
                    ))
                  ) : (
                    <p>No ratings available.</p>
                  )}
                </div>
              </div>
            </div>
            <div ref={roomListRef} className="roomList">
              {(() => {
                if (loading || data2.length === 0) {
                  // Display "Loading" while data is being fetched
                  return <p className="hotelAvail">Loading</p>;
                } else if (!loading && data2.rooms) {
                  // Display the list of hotels if there are hotels available
                  return data2.rooms.map((item) => (
                    <HotelRoom key={item.key} item={item} />
                  ));
                } else if (!loading && !data2.rooms) {
                  // Display "No available hotels" if there are no hotels available
                  return <p className="hotelAvail">No available hotels.</p>;
                }
              })()}
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Hotel;
