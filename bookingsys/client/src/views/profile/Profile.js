import Navbar from "../../components/navbar/Navbar";
import "./Profile.css";
import { Link } from 'react-router-dom'
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
// import Card from 'react-bootstrap/Card';
import mbs from '../../components/images/mbs.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfileCard from '../../components/profilePage/ProfileCard.js'
import FormField from '../../components/profilePage/ProfileForm.js'
import uname from '../login/Login.js'
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");  
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");

  const [uid, setUid] = useState("");
  const [uidfetched, setUidfetched] = useState(false);
  
  const [pass, setPass] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [changesSaved, setChangesSaved] = useState(true); 
  const [bookings, setBookings] = useState([]);

  console.log(

   'check uid state everytime page refreshes ', uid );


  const handleEditProfile = () => {
    setEditMode(true); // Enable edit mode when the button is clicked
    setChangesSaved(false); // Reset changesSaved state when entering edit mode
  };

  const handleSaveChanges = async () => {
    // Perform saving changes logic here
    setChangesSaved(true);
    setEditMode(false);

  
    //try to update profile
    try {
      //const response = await fetch('/api/accounts/one?uid=64ba4601fb292664fa578119', { //currently hardcoded, have to change to fit the logged in user 
      const response = await fetch(`/api/accounts/one?email=${user}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          //uid: "64ba4601fb292664fa578119",
          email: user,
          name: fname,
          email: email,
          phone: phone,
          // password: pass
        }),
      });
  
      if (response.ok) {
        console.log("Account successfully updated.");
      } else {
        console.error("Failed to update account. Status:", response.status);
      }
    } catch (error) {
      console.error("Error updating account:", error);
    }
  
  
  };


  //useeffect to get account for bookings--------------------------
  useEffect(  () => {
    
    fetch(`/api/accounts/one?email=${user}`) 
    //fetch(`/api/accounts/one?email=jon@gmail.com`) 
      .then((response) => response.json() )
      .then( (data) => {
        console.log(' use effect fetch account uid ', data._id); // Log the data received from the API
        setUid(data._id);
        console.log ('uid is here', uid)
        setUidfetched(true);
      })
      .catch((error) => console.error("Error fetching Account info:", error));
    
    console.log(' accounts uid ', uid);

    
  }, []);



  useEffect( () => {
    if (uidfetched !== null) {
      console.log(" account found, now looking for bookings info check if got uid ============= ", uid);
      //fetch(`/api/bookings/id?uid=${uid}`) //this is jon (getting his booking history)
      //fetch('/api/bookings/id?uid=64b7cea9dd171faed8280a5f')
    fetch(`/api/bookings/id?email=${user}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(' account found and bookings api backend data found here XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX ', data, ' type '); // Log the data received from the API
        setBookings(data);
      })
      .catch((error) => console.error("Error fetching booking IDs:", error));
    } else {
      console.log("cant get the uid of the account accoutn dont exist ");
    }

    console.log('lemme see bookings object ', bookings); 
  }, [uid]);



  // useEffect( () => {
  //   if (userid !== null) {
  //     console.log(" account found, now looking for bookings info check if got uid ============= ", userid);
  //     console.log(' accounts uid ', `/api/bookings/id?uid=${userid}`);
  //     fetch(`/api/bookings/id?uid=${userid}`) //this is jon (getting his booking history)
  //     //fetch('/api/bookings/id?uid=64b7cea9dd171faed8280a5f')
  //   //fetch(`/api/bookings/id?email=${user}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(' account found and bookings api backend data found here XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX ', data, ' type '); // Log the data received from the API
  //       setBookings(data);
  //     })
  //     .catch((error) => console.error("Error fetching booking IDs:", error));
  //   } else {
  //     console.log("cant get the uid of the account accoutn dont exist ");
  //   }

  //   console.log('lemme see bookings object ', bookings); 
  // }, []);

  const [profileData, setProfileData] = useState(null); // State to store the profile data

  //useeffect to get account for profile info
  useEffect( () => {
    

    //fetch('/api/accounts/one?email=Gary2@gmail.com') 
    fetch(`/api/accounts/one?email=${user}`) // this works

  //  fetch(`/api/accounts/one?email=${uname.value}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data); // Log the data received from the API


        // Set the form fields using the initial data
        setFname(data.name);
      //  setLname(data.lname);
        setEmail(data.email);
        setPhone(data.phone);
      //  setCountry(data.country);
        setPass(data.password); //this needs to be edited
      })
      .catch((error) => console.error("Error fetching booking info:", error));
  }, []);

//  const [users, setUsers] = useState([]);
  return (
    <div>
      <Navbar />
      <div className="welcome-block">
        <h1 className="welcome-heading">Hello, {fname.charAt(0).toUpperCase() + fname.slice(1)}</h1>

      </div>
      <div className="tabs-container">
        <Tabs defaultActiveKey="profile"id="fill-tab-example"className="mb-3" fill>     
          <Tab eventKey="profile" title="Profile">


            <div>
              <div className="utitle">
                <h4 style={{fontWeight:'bold'}} >My Profile</h4>
                {!editMode && changesSaved && ( // Display the "Edit Profile" button only when not in edit mode
                  <Button variant="primary" onClick={handleEditProfile}   style={{
                    backgroundColor: "#34e0a1",
                    borderColor: "white",
                    color: "black",
                    fontWeight: "bold",}}>
                    Edit Profile
                  </Button>
                )}
                {editMode && (
                  <Button variant="primary" onClick={handleSaveChanges} style={{
                    backgroundColor: "#34e0a1",
                    borderColor: "white",
                    color: "black",
                    fontWeight: "bold",}}>
                    Save Changes
                  </Button>
                )}

              </div>

              <div className="form-fields-container">
              <div className="form-group">

    <Form>
      <Form.Group as={Row} className="mb-3" controlId="fname">
        <Form.Label column sm="2" className="bold-label">
          First Name
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="First Name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            readOnly={!editMode}
            className="form-control"
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="lname">
        <Form.Label column sm="2" className="bold-label">
          Last Name
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Last Name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            readOnly={!editMode}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="email">
        <Form.Label column sm="2" className="bold-label">
          Email Address
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            readOnly={!editMode}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="phone">
        <Form.Label column sm="2" className="bold-label">
          Phone Number
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            readOnly={!editMode}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} className="mb-3" controlId="country">
        <Form.Label column sm="2" className="bold-label">
          Country
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            placeholder="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            readOnly={!editMode}
          />
        </Col>
      </Form.Group>
    </Form>




                </div>
              </div>
            </div>
          </Tab>

<Tab eventKey="bookings" title="Bookings">
  <div className="bookingcards">
    {bookings.length === 0? (
      <p>No bookings found.</p>
    ) : (
      bookings.map( (bookingId) => (
        <ProfileCard
          key={bookingId}
          bookingId={bookingId} // Pass the booking ID as a prop to the ProfileCard component
          email={email}
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