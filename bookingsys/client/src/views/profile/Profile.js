import Navbar from "../../components/navbar/Navbar";
import "./Profile.css";
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// import Card from 'react-bootstrap/Card';
import mbs from '../../components/images/mbs.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileCard from '../../components/profilePage/ProfileCard.js'
import FormField from '../../components/profilePage/ProfileForm.js'

const Profile = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");  
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [pass, setPass] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [changesSaved, setChangesSaved] = useState(true); 

  const handleEditProfile = () => {
    setEditMode(true); // Enable edit mode when the button is clicked
    setChangesSaved(false); // Reset changesSaved state when entering edit mode
  };

  const handleSaveChanges = () => {
    // Perform saving changes logic here
    setChangesSaved(true);
    setEditMode(false);
  };

  
  const [bookings, setBookings] = useState([]);
  
  // useEffect(() => {
  //   fetch(`/api/bookings/?uid=64b7c2f4e5ebb8f59401c8ff`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data); // Log the data received from the API
  //       setBookings(data);
  //     })
  //     .catch((error) => console.error('Error fetching bookings:', error));
  // }, []);

  useEffect(() => {
    fetch('/api/bookings/id?uid=64b7b57c7ce93fc68ac620c3')
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the data received from the API
        setBookings(data);
      })
      .catch((error) => console.error("Error fetching booking IDs:", error));
  }, []);

//  const [users, setUsers] = useState([]);

  console.log(bookings);
  return (
    <div>
      <Navbar />
      <div className="welcome-block">
        <h1>Hello, {fname}</h1>

      </div>
      <div className="tabs-container">
        <Tabs defaultActiveKey="profile"id="profile-tabs"className="mb-3">     
          <Tab eventKey="profile" title="Profile">


            <div>
              <div className="utitle">
                <h2>My Profile</h2>

                {!editMode && changesSaved && ( // Display the "Edit Profile" button only when not in edit mode
                  <Button variant="primary" onClick={handleEditProfile}>
                    Edit Profile
                  </Button>
                )}
                {editMode && (
                  <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                  </Button>
                )}


              </div>
              <div className="user-info">

              <FormField
                  controlId="fname"
                  label="First Name"
                  type="text"
                  placeholder="First Name"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  readOnly={!editMode}
                />
                <FormField
                  controlId="lname"
                  label="Last Name"
                  type="text"
                  placeholder="Last Name"
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  readOnly={!editMode}
                />
                <FormField
                  controlId="email"
                  label="Email Address"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readOnly={!editMode}
                />
                <FormField
                  controlId="phone"
                  label="Phone Number"
                  type="tel"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  readOnly={!editMode}
                />
                <FormField
                  controlId="country"
                  label="Country"
                  type="text"
                  placeholder="Country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  readOnly={!editMode}
                />
                <FormField
                  controlId="pass"
                  label="Password"
                  type="password"
                  placeholder="Password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  readOnly={!editMode}
                />



              </div>
            </div>
          </Tab>
          {/* <Tab eventKey="bookings" title="Bookings">
            <p>Tab content for Bookings hehehehehe</p>
{bookings ? (
    <ProfileCard
      key={bookings._id}
      title={bookings.destID}
      price={bookings.price}
      imageSrc={bookings.price}
      description={bookings.hotelID}
      buttonText="Details"
      buttonLink="/"
    />
  ) : (
    <p>Loading bookings...</p>
  )}
          
          </Tab> */}

<Tab eventKey="bookings" title="Bookings">
  <div className="bookingcards">
    {bookings.length === 0 ? (
      <p>No bookings found.</p>
    ) : (
      bookings.map((bookingId) => (
        <ProfileCard
          key={bookingId}
          bookingId={bookingId} // Pass the booking ID as a prop to the ProfileCard component
        />
      ))
    )}
  </div>
</Tab>

        </Tabs>


      </div>
    </div>
  );
  
};

export default Profile;