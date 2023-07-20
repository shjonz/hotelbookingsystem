import "./hotelRoom.css"

export const HotelRoom = ({item}) => {

  const getRandomSubset = (arr, size) => {
    const shuffled = arr.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, size);
  };


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
            <button className="hrCheckButton">Book Now</button>
        </div>
    </div>
    </div>
  )
}