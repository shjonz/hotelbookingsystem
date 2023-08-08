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

    useEffect( () => {
        const cancelToken = axios.CancelToken.source();
        
        console.log('inside useeffect selectedoption ', selectedOption.label);
        const { data } = axios.get(`http://localhost:3000/search/?name=${selectedOption.label}`).then((res) => {
            setCountry(res.data.slice(0,3)) }
            ).catch(err => {
            if (axios.isCancel(err)) {
                console.log('cancelled!');
            } else {
                console.log('some other error')
            }
        })
            
        return () => {
            cancelToken.cancel()
        }     
        
        
      }, [selectedOption]);

    return (
        <div className='featured'>
            
            {country && country.slice(0, 3).map((item, index) => (
            <div className='featuredItem'>
                <img className='featuredImg' src={nyimg} alt="newyork"></img>

                <div className='featuredTitles'>
                    <h1 className='featuredh1'>{item.name}</h1>
                    <h2 className='featuredh2'>{item.uid}</h2>
                </div>

            </div>
            ))}

        </div>
    )
};

export default Featured