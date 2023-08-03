import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';


const ProfileCard = ({ bookingId, email }) => {
console.log("bookingId:", bookingId);
const [bookingData, setBookingData] = useState(null);
const [bookingExists, setBookingExists] = useState(true);

const ProfileCardMid = ({ Dest, Hotel, Price, imageSrc, buttonText, buttonLink, cancelButton }) => (
  <Card style={{ width: "18rem" }}>
    <Card.Img variant="top" src={imageSrc} />
    <Card.Body>
      <Card.Title>{Dest}</Card.Title>
      <Card.Text>smth here: {Hotel}</Card.Text>
      <Card.Text>Price: {Price}</Card.Text>
      <Link to={buttonLink}>
        <Button variant="primary">{buttonText}</Button>
      </Link>
      <Button variant="danger" size='sm' onClick={onCancelClick}>{cancelButton}</Button>
    </Card.Body>
  </Card>
);

const onCancelClick = async () => {
  console.log('wassup');
  try {
    const response = await fetch(`/api/bookings/one?uid=${bookingId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
       console.log("Booking successfully canceled.");

            // Update user's bookingHistory array
            const userResponse = await fetch(`/api/accounts/del?email=${email}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: email, // Replace with the user's email
                bookingHistory: bookingId,
                action: "remove",
              }),
            });
      
            if (userResponse.ok) {
              console.log("User's bookingHistory successfully updated.");
              // Perform actions to reflect the cancellation, like updating the state or showing a success message.
              window.location.reload();  /////////////////to decide whether to delete this or not 
            } else {
              console.error("Failed to update user's bookingHistory. Status:", userResponse.status);
              // Show an error message or take other appropriate actions based on the status code.
            }
            

      // Perform actions to reflect the cancellation, like updating the state or showing a success message.
    } else {
      console.error("Failed to cancel booking. Status:", response.status);
      // Show an error message to the user or take other appropriate actions based on the status code.
    }
  } catch (error) {
    console.error("Error canceling booking:", error);
    // Handle any other errors that might occur during the fetch operation.
  }
};

useEffect(() => {
  console.log('got it', bookingId, bookingData);
  fetch(`/api/bookings/one?uid=${bookingId}`)
  
    //.then((response) => response.json())
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        setBookingExists(false); // Set bookingExists to false if the booking doesn't exist
        throw new Error("Booking not found");
      }
    })

    .then((data) => {
      
      setBookingData(data);
      console.log('here', bookingData); // Log the data received from the API
    })
    .catch((error) => console.error("Error fetching booking details:", error));
}, [bookingId]);

useEffect(() => {
}, [bookingData]);



return (
  <div>
    {bookingData ? (
      <div>
        <ProfileCardMid 
        Dest = {bookingData.destID}
        Hotel = {bookingData.hotelID}
        Price = {bookingData.price}
        imageSrc = {bookingData.price}
        buttonText ="details"
        buttonLink = "/"
        cancelButton ="cancel"


        />

      </div>
    ) : ( 
       <p>Loading booking details...</p>
    )}
  </div>
);
};





export default ProfileCard;