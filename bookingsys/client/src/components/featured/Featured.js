import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./featured.css";
import nyimg from '../images/newyork.jpg';
import data from "./destinations.json";
import "../navbar/Navbar.js"
const Featured = () => {
  const [options, setOptions] = useState([]);
  //set labelField from Navbar.js as country to be searched from destinations.json
  const country="${labelField}"

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get("http://localhost:3000/api/hotels/default?destination_id=WD0M");
      setOptions(data)
   //const filteredData=data.filter(item => item.name.find(country));
      // Store the data in the options state
      // setOptions(filteredData);
    }

    // Trigger the fetch
    fetchData();
  }, []);

  return (
    <div className='featured'>
      {/* Check if options has at least 3 items before rendering */}
      {options.slice(0, 3).map((item, index) => (
        <div className='featuredItem' key={index}>
          <img className='featuredImg' src={nyimg} alt="newyork" />

          <div className='featuredTitles'>
            <h1>{item.name}</h1>
            <h2>{item.original_metadata.city}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Featured;
