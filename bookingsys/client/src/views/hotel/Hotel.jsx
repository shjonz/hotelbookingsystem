import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import "./Hotel.css"
import { HotelRoom } from "../../components/hotelRoom/HotelRoom";
import React, { useRef, useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

const Hotel = () => {
    const location = useLocation();
    console.log('location ', location);
    const id = location.pathname.split("/"[0]);
    console.log("pathname", location.pathname)
    console.log(' id ', id);
    const id_f = id[2];
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);

    const {dispatch} = 

    useEffect( () => {
        setLoading(true);
        try {
            const fetchFile1 = fetch(`/api/hotels/default/${id_f}`);
            //http://localhost:8800/api/hotels/price?uid=diH7&destination_id=WD0M&checkin=2023-10-01&checkout=2023-10-07&lang=en_US&currency=SGD&guests=2&partner_id=1
            const fetchFile2 = fetch(`/api/hotels/price?uid=${id_f}&destination_id=WD0M`)

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

    const photos = [
        {src: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/cc/6b/92/premier-room.jpg?w=1200&h=-1&s=1"},
        {src: "https://q-xx.bstatic.com/xdata/images/hotel/max500/296671071.jpg?k=c83823a117e31ede0486d94d1a686525bdae0c5378b1aa079752fa8da12658f2&o=" },
        {src: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/296669707.jpg?k=d429f46f694f300cb1bc9b5118ece25b7604c564f46160a08d4795bee760013f&o=&hp=1"},
        {src: "https://www.marinabaysands.com/content/dam/marinabaysands/hotel/premiere-room/masthead.png"},
        {src: "https://i0.wp.com/www.springtomorrow.com/wp-content/uploads/2022/05/Marina-Bay-Sands-1.jpg?ssl=1"},
        {src: "https://annaeverywhere.com/wp-content/uploads/2014/12/DSC00749.jpg"}
    ];

    const roomListRef = useRef(null);

    const scrollToRoomList = () => {
    roomListRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    // const desc = data.description.split(/<[^>]+>/g).filter((text) => text.trim() !== "")
    const renderedHTML = <div dangerouslySetInnerHTML={{ __html: data.description }} />;

    
  return (
    <div>
        <Navbar/>
        <Header type="list"/>
        { loading ? "loading" : (
        <div className="hotelContainer">
            <div className="hotelWrapper">
              <button className="bookNow" onClick={scrollToRoomList}>Book Now</button>
                <h1 className="hotelTitle">
                    {data.name}
                </h1>
                <div className="hotelAddress">
                    <span>{data.address}</span>
                </div>
                <div className="hotelImages">
                    {photos.map(photo=>(
                        <div className="hotelImgWrapper">
                            <img src={photo.src} alt="" className="hotelImg" />
                        </div>
                    ))}
                </div>
                <div className="hotelDetails">
                    <div className="hotelDetailsTexts">
                        <h1 className="hotelTitle">Hotel Description</h1>
                        <p className="hotelDesc">
                        {renderedHTML}
                        </p>
                    </div>
                    <div className="hotelDetailsExtra"><h1>
                    Amenities
                        </h1>
                    
                    {Object.entries(data).map(([key,value]) =>{
                        if (key === "amenities") {
                            return (
                                // <div>{key}:{JSON.stringify(value)}</div>
                                <div>{Object.entries(value).map(([amen,bool]) =>{
                                    return (
                                        <div>{amen}</div>
                                    );
                                })}</div>
                            );
                        }
                    })}

                      </div>
                </div>
                <div ref={roomListRef} className="roomList">
                            <HotelRoom/>
                            <HotelRoom/>
                        </div>
            </div>
        </div> ) }
        <Footer/>
    </div>
  )
}

export default Hotel