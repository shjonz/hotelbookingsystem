import "./searchItem.css"

export const SearchItem = () => {
  return (
    <div className="searchItem">
        <img
        src="https://upload.wikimedia.org/wikipedia/commons/f/f9/Marina_Bay_Sands_in_the_evening_-_20101120.jpg"
        alt=""
        className="siImg"
        />
        <div className="siDesc">
            <h1 className="siTitle">Hotel A</h1>
            <span className="siDistance">500m from center</span>
            <span className="siTaxiOp">Free airport Taxi</span>
            <span className="siSubtitle">Free wifi</span>
            <span className="siFeatures">Entire studio</span>
            <span className="siCancelOp">Free Cancellation</span>
            <span className="siCancelOpSubtitle">You can cancel later, so lock in this great deal now</span>
        </div>
        <div className="siDetails">
        <div className="siRating">
            <span>Excellent</span>
            <button>8.9</button>
        </div>
        <div className="siDetailTexts">
            <span className="siPrice">$123</span>
            <div className="siTaxOp">Includes GST</div>
            <button className="siCheckButton">Book Now</button>
        </div>
    </div>
    </div>
  )
}
