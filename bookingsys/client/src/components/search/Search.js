import { Link, useNavigate } from "react-router-dom";
import "./search.css";
import { useContext } from "react";
import { SearchContext } from "../../context/SearchContext";

const Search = ({item}) => {
  const {dispatch} = useContext(SearchContext);
  const url = item.image.replace(".jpg", "0.jpg")

  const navigate = useNavigate();

  const handleSeeAvail = () => {
    dispatch({ type: "UPDATE_UID", payload: item.id });
    navigate(`/hotels/${item.id}`)
  };

  const openGoogleMaps = (lat, lng) => {
    const mapUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(mapUrl, '_blank');
  };

  const getRatingText = (rating) => {
    if (rating >= 1 && rating < 2) return "";
    if (rating >= 2 && rating < 3) return "";
    if (rating >= 3 && rating < 4) return "Good";
    if (rating >= 4 && rating < 5) return "Very Good";
    if (rating === 5) return "Excellent";
    return "";
  };

  return (
    <div className="searchItem">
      <img
        src = {url}
        alt=""
        className="siImg"
      />
      <div className="siDesc">
        <h1 className="siTitle">{item.name}</h1>
        <span className="siMap"
        onClick={() => openGoogleMaps(item.latitude, item.longitude)}>See it on the Map</span>
      </div>
      <div className="siDetails">
        <div className="siRating">
        <span>{getRatingText(item.rating)}</span>
        <button className={`rating${Math.round(item.rating)}`}>{item.rating}</button>
        </div>
        <div className="siDetailTexts">
        <span className="siPrice">
          {item.price ? `$${item.price}` : 'Unavailable'}{' '}
          
        </span>
        <span className="siTaxOp">{item.price ? `Includes taxes & fees` : ``}</span>
          
          <button className="siCheckButton"
          onClick={()=> handleSeeAvail(item.id)}>More Details</button>

        </div>
      </div>
    </div>
  );
};

export default Search;