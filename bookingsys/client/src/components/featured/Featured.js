import React, {useState, useEffect, useContext} from 'react';
import "./featured.css";
import nyimg from '../images/newyork.jpg';
import axios from 'axios';
import "../navbar/Navbar.js";
import { SelectedOptionContext } from '../../context/SelectedOptionContext';


const Featured = () => {
    const [country, setCountry] = useState([]);
    const { selectedOption, setSelectedOption } = useContext(SelectedOptionContext);
    console.log(' inside featured, ', selectedOption);

    useEffect(() => {
        async function defaultCountry() {
            console.log('inside useeffect selectedoption ', selectedOption.label);
            const { data } = await axios.get(`http://localhost:3000/search/?name=${selectedOption.label}`);
            //const { data } = await axios.get(`http://localhost:3000/search/?name=Singapore`);
            setCountry(data.slice(0,3));
        }
        // Trigger the fetch
        defaultCountry();
      }, [selectedOption]);

    return (
        <div className='featured'>
            
            {country && country.slice(0, 3).map((item, index) => (
            <div className='featuredItem'>
                <img className='featuredImg' src={nyimg} alt="newyork"></img>

                <div className='featuredTitles'>
                    <h1>{item.name}</h1>
                    <h2>{item.uid}</h2>
                </div>

            </div>
            ))}

        </div>
    )
};

export default Featured