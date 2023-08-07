import { Link } from "react-router-dom";
import "./hotelRoom.css";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

export const HotelRoom = ({item}) => {
  const { uid, dest_id, date, guests, lang, currency, partner_id, price, room, hotel_pic, dispatch } = useContext(SearchContext);

  const handleSubmit = (price, room, hotel_pic) => {
    console.log(' handle submit in hotelROom.js update price, room description ', price, room, hotel_pic);
    dispatch({type: "UPDATE_PRICE", payload: {price}});
    dispatch({type:"UPDATE_ROOM", payload: {room}});
    dispatch({type:"UPDATE_HOTEL_PIC", payload: {hotel_pic} } );
  }

  return (
    <div className="hotelRoom">
        <img
        src={item.images[0].url}
        alt=""
        className="hrImg"
        />
        <div className="hrDesc">
            <h1 className="hrTitle">{item.roomDescription}</h1>
            <div className="hrFeatures">
              <span>Amenities:
              <ul>
      {item.amenities.map((amenity, index) => (
        <li key={index}>{amenity}</li>
      ))}
    </ul>
              </span>
            </div>
            <div className="hrCancelOp">{item.free_cancellation ? (
            <span className="YesCancel">Free Cancellation Available</span>
          ) : (
            <span className="NoCancel">Free Cancellation Unavailable</span>
          )}</div>
            </div>
        <div className= "hrDetails">
        <div className="hrRating">
            
        </div>
        <div className="hrDetailTexts">
            <span className="hrPrice">{`$${item.price} per night`}</span>
            <div className="hrTaxOp">Includes taxes & fees</div>
            <button className="hrCheckButton" onClick={() => handleSubmit(item.price, item.roomDescription, item.images[0].url)}><Link to={"/payment"}>Book Now</Link></button>
        </div>
    </div>
    </div>
  )
}