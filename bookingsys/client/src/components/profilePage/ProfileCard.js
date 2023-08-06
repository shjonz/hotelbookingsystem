import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';


const ProfileCard = ({ bookingId, email }) => {
console.log("bookingId:", bookingId);
const [bookingData, setBookingData] = useState(null);
const [bookingExists, setBookingExists] = useState(true);
const [showDetails, setShowDetails] = useState(false);
const [modalShow, setModalShow] = useState(false);

const ProfileCardMid = ({ Dest, Hotel, Price, imageSrc, bookingInfo, buttonText, buttonLink, cancelButton }) => (
  <Card style={{ width: "18rem" }}>
    <Card.Img variant="top" src={imageSrc} />
    <Card.Body>
      <Card.Title>{Dest}</Card.Title>
      <Card.Text>Location: {Hotel}</Card.Text>
      <Card.Text>Price: ${Price}</Card.Text>
      {/* <Card.Text>Booking Info: {bookingInfo}</Card.Text> */}
      {/* <Link to={buttonLink}> */}
        <Button variant="primary" onClick={onDetailsClick}>{buttonText}</Button>
      {/* </Link> */}
      <Button variant="danger" size='sm' onClick={onCancelClick}>{cancelButton}</Button>
    </Card.Body>
  </Card>
);

const MyModal = (props) => {

  const toCamelCase = (str) => {
    return str.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase()); 
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {bookingData.destID}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>

        <strong>Location:</strong> {bookingData.hotelID}<br /><br />
        <strong>Price:</strong> {bookingData.price}<br /><br />

          {Object.entries(bookingData.bookingInfo[2]).map(([key, value]) => (
          <p key={key}>
            <strong>{toCamelCase(key)}:</strong> {JSON.stringify(value)}
          </p>
        ))}

      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

const onDetailsClick = () => {
   setShowDetails(!showDetails);
    setModalShow(true)


}

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
        // bookingInfo ={bookingData.bookingInfo}
        buttonText ="details"
        buttonLink = "/"
        cancelButton ="cancel"
        onDetailsClick={onDetailsClick}


        />
          {showDetails && (
          <div className="mini-screen">  
            <MyModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />

          </div>
        )}
      </div>
    ) : ( 
       <p>Loading booking details...</p>
    )}
  </div>
);
};





export default ProfileCard;