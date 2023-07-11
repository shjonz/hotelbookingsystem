import { Link } from "react-router-dom";
 
const Navbar = () => {
  return (
    <div className="navbar-container">
      <Link className="navbar-title" to={"/"}>booking website</Link>   
      <div className="navbar-sub">
        <Link className="navbar-buttons" to={"/login"}>Login</Link>        
        <Link className="navbar-buttons" to={"/register"}>Register</Link>
        <Link className="navbar-buttons" to={"/profile"}>Profile</Link>
      </div>
    </div>
  );
}
 
export default Navbar;