import "./hotelRoom.css"

export const HotelRoom = () => {
  return (
    <div className="hotelRoom">
        <img
        src="https://assets-global.website-files.com/5c6d6c45eaa55f57c6367749/624b471bdf247131f10ea14f_61d31b8dbff9b500cbd7ed32_types_of_rooms_in_a_5-star_hotel_2_optimized_optimized.jpeg"
        alt=""
        className="hrImg"
        />
        <div className="hrDesc">
            <h1 className="hrTitle">Suite A</h1>
            <span className="hrDistance">500m from center</span>
            <span className="hrTaxiOp">Free airport Taxi</span>
            <span className="hrSubtitle">Free wifi</span>
            <span className="hrFeatures">Entire studio</span>
            <span className="hrCancelOp">Free Cancellation</span>
            <span className="hrCancelOpSubtitle">You can cancel later, so lock in this great deal now</span>
        </div>
        <div className= "hrDetails">
        <div className="hrRating">
            <span>Excellent</span>
            <button>8.9</button>
        </div>
        <div className="hrDetailTexts">
            <span className="hrPrice">$123</span>
            <div className="hrTaxOp">Includes GST</div>
            <button className="hrCheckButton">Book Now</button>
        </div>
    </div>
    </div>
  )
}
