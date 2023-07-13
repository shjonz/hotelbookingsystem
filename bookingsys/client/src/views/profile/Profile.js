import Navbar from "../../components/navbar/Navbar";
import "./Profile.css";
import { Link } from 'react-router-dom'
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import mbs from '../../components/images/mbs.jpg'
import 'bootstrap/dist/css/bootstrap.min.css';


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

              <Form.Group controlId="fname">                
                <Form.Label>First Name </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  value={fname}
                  onChange={(e) => setFname(e.target.value)}
                  disabled ={!editMode}
                  readOnly={!editMode} // Set the readOnly attribute based on edit mode
                />
                </Form.Group>

                <Form.Group controlId="lname">
                  <Form.Label>Last Name </Form.Label>
                  <Form.Control
                    type="lname"
                    placeholder="Last Name"
                    value={lname}
                    onChange={(e) => setLname(e.target.value)}
                    readOnly={!editMode} // Set the readOnly attribute based on edit mode
                  />
                </Form.Group>

                <Form.Group controlId="email">
                  <Form.Label>Email Address </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    readOnly={!editMode} // Set the readOnly attribute based on edit mode
                  />
                </Form.Group>

                <Form.Group controlId="phone">
                  <Form.Label>Phone Number </Form.Label>
                  <Form.Control
                    type="phone"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    readOnly={!editMode} // Set the readOnly attribute based on edit mode
                  />
                </Form.Group>

                <Form.Group controlId="country">
                  <Form.Label>Country </Form.Label>
                  <Form.Control
                    type="country"
                    placeholder="Country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    readOnly={!editMode} // Set the readOnly attribute based on edit mode
                  />
                </Form.Group>

                <Form.Group controlId="pass">
                  <Form.Label>Password </Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                    readOnly={!editMode} // Set the readOnly attribute based on edit mode
                  />
                </Form.Group>
              </div>
            </div>
          </Tab>
          <Tab eventKey="bookings" title="Bookings">
            <p>Tab content for Bookings hehehehehe</p>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={mbs} />
              <Card.Body>
                <Card.Title>Hotel Name</Card.Title>
                <Card.Text>
                  Some info of the place idk
                </Card.Text>
                <Link to="/">
                <Button variant="primary">Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </Tab>
          <Tab eventKey="disabled" title="Disabled" disabled>
            Tab content for Disabled
          </Tab>
        </Tabs>


      </div>
    </div>
  );
};

export default Profile;