import Navbar from "../../components/navbar/Navbar";
import { Await, useNavigate } from "react-router-dom";
import { useState, useEffect } from 'react';
import "./Login.css";
import { Link } from 'react-router-dom';
import bcrypt from "bcryptjs";


const Login = () => {

// React States
const [errorMessages, setErrorMessages] = useState({});
const [isSubmitted, setIsSubmitted] = useState(false);
const [loading, setLoading] = useState(false);
const [pw, setPw] = useState("");
const [email, setEmail] = useState("");

//this is to call the backend which calls an external api. refer to server/routes/hotels.js and also server/server.js
  // useEffect( (email) => {
  //   setLoading(true);
  //   try {
  //       console.log(' use effet login page ' );
  //       fetch(`/api/accounts/${email}`)
  //        //fetch(`/api/hotels/prices?destination_id=${dest_id}&checkin=${start_date}&checkout=${end_date}&lang=en_US&currency=SGD&guests=2&partner_id=1`)
  //       .then(
  //           response => response.json()
  //       ).then(data => {
  //           console.log('inside use effect fetch ', data.email, data.username, data.name);
  //           return data;
  //       });
  //   } catch (err) {
  //     console.log(' use effect error');
  //   }
  //   setLoading(false);
    
  //   }, [])
    

// User Login info mongodb database
const database = [
  {
    username: "user1",
    password: "pass1"
  },
  {
    username: "user2",
    password: "pass2"
  }
];

const errors = {
  uname: "invalid username",
  pass: "invalid password"
};

const handleSubmit = (event) => {
  //Prevent page reload
  event.preventDefault();

  //console.log('handlesubmit document.forms[0] ', document.forms[0].uname, document.forms[0].pass )
  var { uname, pass } = document.forms[0];
  const datapw = null;
  const dataemail = null;

  //console.log(' uname, pass ', uname.value, pass.value);

  // Find user login info
  //const userData = database.find((user) => user.username === uname.value);
  setLoading(true);
  try {
    console.log(' use effet login page ' );
    fetch(`/api/accounts/one?email=${uname.value}`)
    .then(
      response => response.json()
    ).then(async data => {
      console.log('inside use effect fetch ', data.email, data.password, data.name, uname.value, pass.value);
      //datapw = data.password;
      //dataemail = data.email;
      //console.log('check if retrieved ', datapw, dataemail);

      if (uname.value && pass.value) {
        const isPwCorrect = await bcrypt.compare( pass.value, data.password );
        const isEmailCorrect = dataemail === uname.value;
        console.log( 'isPwCorrect ', isPwCorrect, 'isemailcorrect ', isEmailCorrect );
      
        if (!isPwCorrect) {
          // Invalid password
          console.log(' if pw wrong ');
          setErrorMessages({ name: "pass", message: errors.pass });
        } else {
          console.log(' if pw correct ');
          setIsSubmitted(true);
        } 
      } else {
        //   // Username not found
        setErrorMessages({ name: "uname", message: errors.uname });
      }
    }).catch( error => {
      console.log('error caught ');
    });
  } catch (err) {
    console.log(' use effect error');
  }
  setLoading(false);

  
  

  // Compare user info
  // if (userData) {
  //   if (userData.password !== pass.value) {
  //     // Invalid password
  //     setErrorMessages({ name: "pass", message: errors.pass });
  //   } else {
  //     setIsSubmitted(true);
  //   }
  // } else {
  //   // Username not found
  //   setErrorMessages({ name: "uname", message: errors.uname });
  // }
};

// Generate JSX code for error message
const renderErrorMessage = (name) =>
  name === errorMessages.name && (
    <div className="error">{errorMessages.message}</div>
  );

// JSX code for login form
const renderForm = (
  <div className="form">
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <label>Username </label>
        <input type="text" name="uname" required />
        {renderErrorMessage("uname")}
      </div>
      <div className="input-container">
        <label>Password </label>
        <input type="password" name="pass" required />
        {renderErrorMessage("pass")}
      </div>
      <div className="button-container">
        <input type="submit" />
      </div>
    </form>
  </div>
);



    //  let navigate = useNavigate()
      return (
        <div>
            <Navbar />
        <div className="app">
        <div className="login-form">
          <div className="title">Sign In</div>
          {isSubmitted ? <div>User is successfully logged in
          </div> : renderForm}
          <Link className="reg-button" to={"/Register"}>New? Sign up here</Link>
        </div>
      </div>
      </div>
      );
    }
    
export default Login;