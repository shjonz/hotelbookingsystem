import { Link } from "react-router-dom"
import "./hotelRoom.css"

export const HotelRoom = ({item}) => {




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
            <span className="NoCancel">No Free Cancellation</span>
          )}</div>
            </div>
        <div className= "hrDetails">
        <div className="hrRating">
            
        </div>
        <div className="hrDetailTexts">
            <span className="hrPrice">{`$${item.price} per night`}</span>
            <div className="hrTaxOp">Includes GST</div>
            <button className="hrCheckButton"><Link to={"/payment"}>Book Now</Link></button>
        </div>
    </div>
    </div>
  )
}