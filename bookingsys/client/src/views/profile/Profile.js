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
  const [userid, setUid] = useState("");
  const [uidfetched, setUidfetched] = useState(false);
  const [country, setCountry] = useState("");
  const [pass, setPass] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [changesSaved, setChangesSaved] = useState(true); 
  const [bookings, setBookings] = useState([]);

  console.log(
   'check uid state everytime page refreshes ', userid );

  const handleEditProfile = () => {
    setEditMode(true); // Enable edit mode when the button is clicked
    setChangesSaved(false); // Reset changesSaved state when entering edit mode
  };

  const handleSaveChanges = async () => {
    // Perform saving changes logic here
    setChangesSaved(true);
    setEditMode(false);

    //prolly have to change this to useState eventually
    // const email = "cordtest@gmail.com";
    // const uid = '64ba4601fb292664fa578119'
    // const updates = {
    // //  bookingHistory: ["64b7b57c7ce93fc68ac620c3", "another_booking_id"],
    //   uid: "64ba4601fb292664fa578119",
    //   name: fname,
    //   email: email,
    //   password: pass,
    // };
  
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

  
  
  
  // useEffect(() => {
  //   fetch(`/api/bookings/?uid=64b7c2f4e5ebb8f59401c8ff`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data); // Log the data received from the API
  //       setBookings(data);
  //     })
  //     .catch((error) => console.error('Error fetching bookings:', error));
  // }, []);

  //useeffect to get account for bookings
  useEffect( () => {
    //setLoading(true);
        // try {
        //     // console.log("payload", uid, dest_id, date, guests, lang, currency, partner_id)

        //     // const sDate = format(date[0].startDate, "yyyy-MM-dd");
        //     // const eDate = format(date[0].endDate, "yyyy-MM-dd");

        //     const url1 = `/api/accounts/one?email=${user}`
        //     const fetchFile1 = fetch(url1)
            
        //     Promise.all([fetchFile1])
        //     .then((responses) => Promise.all(responses.map((res) => res.json())))
        //     .then((data) => {
        //       const [file1Data, file2Data] = data;
        //       setUid(file1Data);
        //       console.log('Data from file 1:', file1Data);
        //       console.log('Data from file 2:', file2Data);
        //     })
        // } catch (err) {
        //   console.log(' use effect error');
        // }
        //setLoading(false);
    let user_IDDDDDDDDD;
    fetch(`/api/accounts/one?email=${user}`) 
      .then((response) => response.json() )
      .then( (data) => {
        console.log(' use effect fetch account uid ', data._id.toString() ); // Log the data received from the API
        setUid( data._id.toString() );
        user_IDDDDDDDDD = data._id.toString(); 
        //fetched(true);
        console.log(' use effect see account uid lemme see the state ', userid)
        
      })
      .catch((error) => console.error("Error fetching Account info:", error));
    
      console.log('outside of use effect need to check USERIDDDDDDDDDDDDDD ', user_IDDDDDDDDD);

    if (userid !== null) {
        console.log(" account found, now looking for bookings info check if got uid ============= ", userid);
        console.log(' accounts uid ', `/api/bookings/id?uid=${userid}`);
        fetch(`/api/bookings/id?uid=${userid}`) //this is jon (getting his booking history)
        //fetch('/api/bookings/id?uid=64b7cea9dd171faed8280a5f')
      //fetch(`/api/bookings/id?email=${user}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(' account found and bookings api backend data found here XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX ', data, ' type '); // Log the data received from the API
          setBookings(data);
        })
        .catch((error) => console.error("Error fetching booking IDs:", error));
      } else {
        console.log("cant get the uid of the account accoutn dont exist ");
      }
    
    console.log(' accounts uid ', userid);
    
  }, []);


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
    
  //  fetch('/api/accounts/one?email=jon@gmail.com') 
    fetch(`/api/accounts/one?email=${user}`) 
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
        setPass(data.password);
      })
      .catch((error) => console.error("Error fetching booking info:", error));
  }, []);

//  const [users, setUsers] = useState([]);
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
    {bookings === null ? (
      <p>No bookings found.</p>
    ) : (
      bookings.map( (bookingId) => (
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