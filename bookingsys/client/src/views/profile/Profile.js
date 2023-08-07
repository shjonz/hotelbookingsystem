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
import uname from '../login/Login.js'
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");  
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [uid, setUid] = useState("");

  const [uidfetched, setUidfetched] = useState(false);
  const [country, setCountry] = useState("");
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
          password: pass
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
      //  setPhone(data.phone);
      //  setCountry(data.country);
        setPass(data.password); //this needs to be edited
      })
      .catch((error) => console.error("Error fetching booking info:", error));
  }, []);

  console.log('bookigns', bookings)

//  const [users, setUsers] = useState([]);
  return (
    <div>
      <Navbar />
      <div className="welcome-block">
        <h1 className="welcome-heading">Hello, {fname.charAt(0).toUpperCase() + fname.slice(1)}</h1>

      </div>
      <div className="tabs-container">
        <Tabs defaultActiveKey="profile"id="profile-tabs"className="mb-3">     
          <Tab eventKey="profile" title="Profile">


            <div>
              <div className="utitle">
                <h3 style={{fontWeight:'normal'}} >My Profile</h3>
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