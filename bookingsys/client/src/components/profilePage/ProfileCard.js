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
  const [bookingData, setBookingData] = useState(null);

  useEffect(() => {
    fetch(`/api/bookings/?uid=${bookingId}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the data received from the API
        setBookingData(data);
      })
      .catch((error) => console.error("Error fetching booking details:", error));
  }, [bookingId]);

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