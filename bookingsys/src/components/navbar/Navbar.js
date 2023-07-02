import "./navbar.css"

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbarContainer">
                <span className="logo">bookingwebsite</span>
                <div className="navItems">
                    
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#services">Cities</a></li>
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#portfolio">Countries</a></li>
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#about">Featured</a></li>
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#team">Currency</a></li>
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#contact">Contact</a></li>
                        <button className="navButton">Register</button>
                        <button className="navButton">Login</button>
                    
                </div>
            </div>
        </div>
    )
}

export default Navbar