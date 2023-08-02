import { useContext } from "react";
import "./navbar.css"
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Dropdown from 'react-dropdown';
import data from './countrycodeflagname.json';

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
                        {/* <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#portfolio">Countries</a></li> */}
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="/">Featured</a></li>
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#team">Currency</a></li>
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="/profile">{user}</a></li>
                        <Dropdown
        placeholder="Select an option"
        className="dropdown"
        options={data.map((item) => ({ value: item.code, label: item.name, flag: item.flag }))}
        // options={countries.map((item) => ({ value: item.code, label: item.name, flag: item.flag }))}
        // optionRenderer={(option) => <CustomOption option={option} />} // Use the custom component
        values={[]} // Provide an empty array or the initial selected values (if any)
        multi={false} // Set this to true for a multi-select dropdown
        onChange={(values) => console.log('Selected:', values)} // This function will be called when the selection changes
        labelField="label" // Set the field to be displayed as the label in the dropdown
        valueField="value"// Set the field to be used as the actual value when an option is selected
        
        color="primary" // Customize the color of the dropdown
        keepSelectedInList={true} // Keep selected options in the dropdown list
        dropdownGap={5} // Set the gap between the dropdown and the select box
        value="Country"
        isSearchable={true}
        // onChange={(value) => console.log('change!', value)}
        onSelect={(value) => console.log('selected!', value)} // always fires once a selection happens even if there is no change
        onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
        onOpen={() => console.log('open!')}></Dropdown> 
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
                <div><Dropdown
        placeholder="Select an option"
        className="dropdown"
        options={data.map((item) => ({ value: item.code, label: item.name, flag: item.flag }))}
        // options={countries.map((item) => ({ value: item.code, label: item.name, flag: item.flag }))}
        // optionRenderer={(option) => <CustomOption option={option} />} // Use the custom component
        values={[]} // Provide an empty array or the initial selected values (if any)
        multi={false} // Set this to true for a multi-select dropdown
        onChange={(values) => console.log('Selected:', values)} // This function will be called when the selection changes
        labelField="label" // Set the field to be displayed as the label in the dropdown
        valueField="value"// Set the field to be used as the actual value when an option is selected
        
        color="primary" // Customize the color of the dropdown
        keepSelectedInList={true} // Keep selected options in the dropdown list
        dropdownGap={5} // Set the gap between the dropdown and the select box
        value="Country"
        isSearchable={true}
        // onChange={(value) => console.log('change!', value)}
        onSelect={(value) => console.log('selected!', value)} // always fires once a selection happens even if there is no change
        onClose={(closedBySelection) => console.log('closedBySelection?:', closedBySelection)}
        onOpen={() => console.log('open!')}></Dropdown></div> 
                {user ? user : (
                <div className="navItems">
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#services">Cities</a></li>
                        {/* <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#portfolio">Countries</a></li> */}
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="/">Featured</a></li>
                        <li class="nav-item"><a class="nav-link js-scroll-trigger" href="#team">Currency</a></li>
                
                        <button className="navButton"><Link to={"/login"}>Login/Sign Up</Link></button>  

                </div>
            ) }
            </div>
        </div>
        )
    }
}

export default Navbar