import React, { useRef,useState, useContext,useEffect } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar";
import { Link, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext"; // Replace with the correct path to your AuthContextProvider
import "./guestInfo.css";
import { SearchContext } from "../../context/SearchContext";

function GuestInfo(){
  const { user, setUser, loadingauth, error, dispatch } = useContext(AuthContext);
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
  console.log(user)
  

  // Define state variables for each input field
  const [bookingInfo, setBookingInfo] = useState("[]");
  const [bookingId, setBookingId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [billingAddress, setBillingAddress] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [destID, setDestID] = useState("");
  const [hotelID, setHotelID] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the user is logged in before allowing form submission
    if (!user) {
      alert("You need to be logged in to submit the form.");
      return;
    }

    console.log("Inside handle submit")
    const guestInfo = {
      "firstName": firstName,
      "secondName":secondName,
      "email":email,
      "phone":phone,
      "billingAddress":billingAddress,
      "specialRequest":specialRequest
    };
    
    
    try {
      // Convert the guestInfo object to a JSON-formatted string
      const bookingInfoString = JSON.stringify(guestInfo);
      // Create the booking object to be stored in the database
      const bookingData = {
        "destID":dest_id,
        "hotelID":hotelID,
        "price": 50,
        "bookingInfo": { "2": bookingInfoString } // Set the bookingInfo object with the guest information
      };

      //Send a POST request to the backend API endpoint to store the booking data
      const response = await axios.post("/api/bookings/create", bookingData).then((response)=> {
        console.log(response.data);//Holds the booking id
        alert("Form submitted successfully");
      });


      // Handle the response if needed (e.g., show success message)
      console.log("Booking information stored successfully:",bookingData);
    } catch (error) {

      // Handle any errors that occurred during the request
      console.error("Error storing booking information:", error);
    }
  };
 
  return (
    <div className="GuestInfo">
      <h1>Guest Information</h1>
        {/* <div className="input-group">
          <label htmlFor="destID">Destination ID</label>
          <input
            type="text"
            id="destID"
            value={destID}
            onChange={(e) => setDestID(e.target.value)}
            placeholder="Enter Destination ID"
          />
        </div> */}
        <div className="input-group">
          <label htmlFor="hotelID">Hotel ID</label>
          <input
            type="text"
            id="hotelID"
            value={hotelID}
            onChange={(e) => setHotelID(e.target.value)}
            placeholder="Enter Hotel ID"
          />
        </div>
        <div className="input-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
          />
        </div>
        <div className="input-group">
          <label htmlFor="secondName">Second Name</label>
          <input
            type="text"
            id="secondName"
            value={secondName}
            onChange={(e) => setSecondName(e.target.value)}
            placeholder="Second Name"
          />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
          />
        </div>
        <div className="input-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone Number"
          />
        </div>
        <div className="input-group">
          <label htmlFor="billingAddress">Billing Address</label>
          <input
            type="text"
            id="billingAddress"
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
            placeholder="Billing Address"
          />
        </div>
        <div className="input-group">
          <label htmlFor="specialRequest">Special Requests</label>
          <textarea
            id="specialRequest"
            value={specialRequest}
            onChange={(e) => setSpecialRequest(e.target.value)}
            placeholder="Any special requests..."
          />
          <button onClick={handleSubmit}>Submit</button>
        </div>
    </div>
  );
}

export default GuestInfo;