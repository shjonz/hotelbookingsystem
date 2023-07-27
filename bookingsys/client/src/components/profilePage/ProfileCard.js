import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// const ProfileCard = ({ title, imageSrc, description, price, buttonText, buttonLink }) => (
//     <Card style={{ width: "18rem" }}>
//       <Card.Img variant="top" src={imageSrc} />
//       <Card.Body>
//         <Card.Title>{title}</Card.Title>
//         <Card.Text>{description}</Card.Text>
//         <Card.Text>{price}</Card.Text>
//         <Link to={buttonLink}>
//           <Button variant="primary">{buttonText}</Button>
//         </Link>
//       </Card.Body>
//     </Card>
//   );

// export default ProfileCard


const ProfileCardMid = ({ Dest, Hotel, Price, imageSrc, buttonText, buttonLink }) => (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src={imageSrc} />
      <Card.Body>
        <Card.Title>{Dest}</Card.Title>
        <Card.Text>smth here: {Hotel}</Card.Text>
        <Card.Text>Price: {Price}</Card.Text>
        <Link to={buttonLink}>
          <Button variant="primary">{buttonText}</Button>
        </Link>
      </Card.Body>
    </Card>
  );

  

const ProfileCard = ({ bookingId }) => {
  console.log("bookingId:", bookingId);
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    console.log('got it', bookingId, bookingData);
    fetch(`/api/bookings/one?uid=${bookingId}`)
    
      .then((response) => response.json())
      .then((data) => {
        
        setBookingData(data);
        console.log('here', bookingData); // Log the data received from the API
      })
      .catch((error) => console.error("Error fetching booking details:", error));
  }, [bookingId]);

  useEffect(() => {
  //  console.log('here', bookingData); // Log the updated bookingData state
  }, [bookingData]);



  return (
    <div>
      {bookingData ? (
        <div>
          {/* <h3>{bookingData.destID}</h3>
          <p>Price: {bookingData.price}</p>
          Add other booking details you want to display */}
          <ProfileCardMid 
          Dest = {bookingData.destID}
          Hotel = {bookingData.hotelID}
          Price = {bookingData.price}
          imageSrc = {bookingData.price}
          buttonText ="details"
          buttonLink = "/"

          />

        </div>
      ) : (
        <p>Loading booking details...</p>
      )}
    </div>
  );
};

export default ProfileCard;