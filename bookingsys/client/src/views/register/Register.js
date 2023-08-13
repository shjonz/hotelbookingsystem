import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import "../login/Login.css";
import { Link } from 'react-router-dom';
import background from '../../components/images/palmtree.jpg';


const Register = () => {
// React States
const [errorMessages, setErrorMessages] = useState({});
const [isSubmitted, setIsSubmitted] = useState(false);
const [accounts, setAccounts] = useState([]);

// User Login info
useEffect(() => {
  const fetchAccounts = async() => {
    try {
      const response = await fetch('/api/accounts');
      if (response.ok){
        const data = await response.json();
        setAccounts(data);
        console.log("data", data)
      }
      else {
        throw new Error('Failed to fetch accounts');
      }
    }
    catch (err) {
      console.error(err)
    }
  };
  fetchAccounts();
}, []);

const errors = {
  uname: "invalid username",
  pass: "invalid password",
  email: "invalid email",
  exist: "account already exists"
};

const handleSubmit = async (event) => {
  //Prevent page reload
  event.preventDefault();

  var form = document.forms[0];
  const uname = form.uname.value;
  const pass = form.pass.value;
  const email = form.email.value;
  

  try {
    const response = await fetch('/api/accounts/one', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: uname,
        email: email,
        password: pass,
        bookingHistory: []
      }),
    });
    if (response.ok){
      setIsSubmitted(true);
    }
    else{
      setErrorMessages({name: "email", message: errors.exist})
      throw new Error("Failed to register")
    } 
  } catch (err) {
    console.error(err)
  }
  }

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

      <div className="input-container">
        <label>Email </label>
        <input type="text" name="email" required />
        {renderErrorMessage("email")}
      </div>

      <div className="button-container">
        <input type="submit" />
      </div>
    </form>
  </div>
);


      return (
        <div>
            <Navbar />
        <div className="app" style={{ backgroundImage: `url(${background})` }}>
        <div className="login-form">
          <div className="title">Register</div>
          {isSubmitted ? <div>User is successfully registered
          </div> : renderForm}
          <Link className="reg-button" to={"/Login"}>Sign in</Link>
        </div>
      </div>
      </div>
      );
    }
    
export default Register;