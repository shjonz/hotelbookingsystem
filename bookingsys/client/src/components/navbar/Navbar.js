import { useContext } from "react";
import "./navbar.css"
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
    const { user } = useContext(AuthContext);
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
                            <li class="nav-item"><a class="nav-link js-scroll-trigger" href="/profile">Contact</a></li>
                            <button className="showusername">{user.email}</button>
                            <button className="navButton"><Link to={"/"}>Logout</Link></button>       
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
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="/profile">Contact</a></li>
                        <button className="navButton"><Link to={"/register"}>Register</Link></button>
                        <button className="navButton"><Link to={"/login"}>Login</Link></button>       
                </div> 
            ) }
            </div>
        </div>
        )
    }
}

export default Navbar