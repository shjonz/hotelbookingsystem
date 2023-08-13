import Navbar from "../../components/navbar/Navbar";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import "./Login.css";
import { Link } from 'react-router-dom';
import bcrypt from "bcryptjs";
import { AuthContext } from "../../context/AuthContext";
import background from '../../components/images/palmtree.jpg';

const Login = () => {

// React States
const [errorMessages, setErrorMessages] = useState({});
const [isSubmitted, setIsSubmitted] = useState(false);
const [loading, setLoading] = useState(false);
const [userInfo, setUserInfo] = useState({
  name: undefined,
  email: undefined
});

const { user, loadingauth, error, dispatch } = useContext(AuthContext);

const navigate = useNavigate()

const errors = {
  uname: "invalid username",
  pass: "invalid password or email"
};

const handleSubmit = (event) => {
  //Prevent page reload
  event.preventDefault();

  var { uname, pass } = document.forms[0];
  dispatch({ type: "LOGIN_START" });

  // Find user login info
  setLoading(true);
  try {
    console.log(' use effet login page ' );
    fetch(`/api/accounts/one?email=${uname.value}`)
    .then(
      response => response.json()
    ).then(async data => {

      if (uname.value && pass.value) {
        const isPwCorrect = await bcrypt.compare( pass.value, data.password );
        const isEmailCorrect = data.email === uname.value;
        console.log( 'isPwCorrect ', isPwCorrect, 'isemailcorrect ', isEmailCorrect );
      
        if (!isPwCorrect || !isEmailCorrect) {
          // Invalid password
          console.log(' if pw wrong ');
          setErrorMessages({ name: "pass", message: errors.pass });
        } else {
          console.log(' if pw correct ');
          setIsSubmitted(true);
          dispatch({ type: "LOGIN_SUCCESS", payload: data.email });
          setUserInfo({
            name: data.email,
            email: data.name,
          })
          navigate("/" );
          
        } 
      } 
    }).catch( error => {
      console.log('error caught  or email wrong  ');
      
      setErrorMessages({ name: "pass", message: errors.pass });
      dispatch({ type: "LOGIN_FAILURE", payload: error.response });
    });
  } catch (err) {
    console.log(' use effect error');
  }
  setLoading(false);
};

console.log('login page check for user info ', user )

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
        <div className="app" style={{ backgroundImage: `url(${background})` }}>
        <div className="login-form">
          <div className="title">Sign In</div>
          {isSubmitted ? <div>User is successfully logged in
          </div> : renderForm}
          <Link className="reg-button" disabled={loading} to={"/Register"}>New? Sign up here</Link>
        </div>
      </div>
      </div>
      );
    }
    
export default Login;
