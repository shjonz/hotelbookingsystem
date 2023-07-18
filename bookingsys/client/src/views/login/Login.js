import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import "./Login.css";
import { Link } from 'react-router-dom';


const Login = () => {

// React States
const [errorMessages, setErrorMessages] = useState({});
const [isSubmitted, setIsSubmitted] = useState(false);

// User Login info mongodb database
const database = [
  {
    email: "user1",
    password: "pass1"
  },
  {
    email: "user2",
    password: "pass2"
  }
];

const errors = {
  email: "invalid email",
  pass: "invalid password"
};

const handleSubmit = (event) => {
  //Prevent page reload
  event.preventDefault();

  var { email, pass } = document.forms[0];

  // Find user login info
  const userData = database.find((user) => user.username === email.value);

  // Compare user info
  if (userData) {
    if (userData.password !== pass.value) {
      // Invalid password
      setErrorMessages({ name: "pass", message: errors.pass });
    } else {
      setIsSubmitted(true);
    }
  } else {
    // Username not found
    setErrorMessages({ name: "email", message: errors.email });
  }
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
        <label>Email </label>
        <input type="text" name="email" required />
        {renderErrorMessage("email")}
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