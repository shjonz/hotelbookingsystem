import { useContext } from "react";
import "./navbar.css"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
    const { user, dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    console.log(' navbar lemme see user info ', user);
    const handleClick = () => {
        window.localStorage.clear()
        dispatch({ type: "LOGOUT" });
        console.log( 'press logout handleclick check user info ', user );
        navigate("/");
    }
    // const viewProfile = () => {
    //     navigate("profile");
    // }
    
    if (user) {
        return (
            <div className="navbar">
                <div className="navbarContainer">
                    <span className="logo">bookingwebsite</span>
                    <div className="navItems">
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#services">Cities</a></li>
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#portfolio">Countries</a></li>
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="/">Featured</a></li>
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#team">Currency</a></li>
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="/profile">{user}</a></li>
                        {/* <button onClick={viewProfile} className="showusername">{user}</button> */}
                        <button onClick={handleClick} className="navButton"><Link>Logout</Link></button>       
                    </div> 
                </div>
            </div>
            )
    } else {
        return (
        <div className="navbar">
            <div className="navbarContainer">
                <span className="logo">bookingwebsite</span>
                {user ? user : (
                <div className="navItems">
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#services">Cities</a></li>
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#portfolio">Countries</a></li>
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="/">Featured</a></li>
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#team">Currency</a></li>
                        {/* <li class="nav-item"><a class="nav-link js-scroll-trigger" href="/login">Profile</a></li> */}
                        {/* <button className="navButton"><Link to={"/register"}>Register</Link></button> */}
                        <button className="navButton"><Link to={"/login"}>Login/Sign Up</Link></button>
                    
                </div>
            ) }
            </div>
        </div>
        )
    }
}

export default Navbar