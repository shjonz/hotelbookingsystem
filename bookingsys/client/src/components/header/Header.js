import React, { createContext, useState, useEffect } from "react";
import "./header.css";
import background from '../images/sample.jpeg';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns';
import { useNavigate, useLocation } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

const Header = ({type}) => {
    //use state this one go search yourself its v useful
    
    const [destination, setDestination] = useState("");
    const [dest_id, setDestID] = useState("");
    //this is to open the calendar
    const [openDate, setOpenDate] = useState(false);
    const [dropDownList, setDropdownList] = useState([]);
    
   


    //this is to select the dates
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);


    //for opening up the option to choose room type and number of children n adults
    const [openOptions, setOpenOptions] = useState(false);


    //this is to select room type, num of children n adults
    const [options, setOptions] = useState(
        {
          adult: 1,
          children: 0,
          room: 1,
        }
      );


    //this is to handle the options up and down
    //prev is the previous state
    const handleOption = (name, operation ) => {
        setOptions( (prev) => { 
            return {
                ...prev, 
                [name] : operation === "i" ? options[name] + 1 : options[name] - 1, 
            }; 
        });
    };


    //this is to navigate to website the diff /hotels page when i click the search button
    const navigate = useNavigate();
    const handleSearch = () => {
        navigate("/hotels", { state: { destination, date, options, dest_id } });
    };

    //this is used to change the dropdown list when i click on the dropdown list suggestions
    const onSearch = (searchTerm) => {
        
        const item_json = dropDownList.find( ({ name }) => name === searchTerm );
        console.log("onSearch value ", searchTerm, item_json, item_json.uid );
        setDestination(searchTerm);
        setDestID(item_json.uid);
        //console.log("onSearch for header component lemme see whats inside ", searchTerm.uid);
    };

    
    //this is what links to the backend, for backend check the server/routes/search.js as well as server/server.js
    const fetchData = (value) => {
        try {
            console.log(' inside search bar itself ' );
            fetch(`/search?name=${value}`)
            .then( (response) => response.json() )
            .then( (data) => {
                console.log('inside fetchdata try ', value, data);
                const results = data.filter( (item) => {
                    return (
                    value && 
                    item && 
                    item.name 
                    //item.name.toLowerCase().includes(value.toLowerCase())
                    );
                });
                console.log('results ', results);
                setDropdownList(results);
        }).catch( error => {
            if(error.name === 'SyntaxError' && error.message.includes('Unexpected end of JSON input') ) {
                console.error('Truncated data: Not all of the JSON data was received');
            }
        })
        } catch (err) {
            console.log('error catched');
        }
    }

    //this causes the changes in the input when u type stuff in the search input box
    const handleChange = (value) => {
        console.log("handlechange value ", value, value.name, value.id);
        setDestination(value);
        fetchData(value);  
    }


    return (
        <div className="header" style={{
            backgroundImage : `url(${background})`
        }} >
        <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
        { type !== "list" && 
            <div className="headerSearch">

                <div className="headerSearchItem1">
                    <div className="destinationorhotel">Destination or Hotel</div>
                    <input className="headerSearchInput" 
                    type="text" 
                    //this is the input 
                    placeholder="Search your destination..."
                    value = {destination}
                    onChange={ (e) => handleChange(e.target.value) } />  
            </div> 


            <div className="dropdown">
                {dropDownList
                    .map( (item) => (
                        //this is responsible for drop down that appears
                    <div
                    className="dropdown-row"
                    key={item.uid}
                    onClick={() => onSearch(item.name)}
                    >
                    {item.name}
                    </div>
                ))}
            </div> 

                    
            <div className="headerSearchItem2">
                <span onClick={ () => setOpenDate( !openDate ) } className="headerSearchText1">{`${format(date[0].startDate, "MM/dd/yyyy")} to 
                ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                {openDate && <DateRange
                    //this is ur calendar that opens when u click the dates 
                    editableDateInputs = {true}
                    onChange = { (item) => setDate( [item.selection] ) }
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                /> }
            </div>


            <div className="headerSearchItem3">
                <span onClick={ () => setOpenOptions( !openOptions ) }
                className="headerSearchText2">{`${options.adult} adult ${options.children} children 
                ${options.room} room`}</span>

                {openOptions && ( //this opens up the 3 options - adult, children and room when u click on it. 
                <div className="options">

                    <div className="optionItem">
                        <span className="optionText">Adult</span>
                        <div className="optionCounter">
                            <button className="optionCounterButton" 
                            disabled={options.adult <= 1}
                            onClick={ () => handleOption("adult", "d") }>-</button>
                            <span className="optionCounterNumber">{options.adult}</span>
                            <button className="optionCounterButton" onClick={ () => handleOption("adult", "i") }>+</button>
                        </div>
                    </div>
                    
                    <div className="optionItem">
                        <span className="optionText">Children</span>
                        <div className="optionCounter">
                            <button className="optionCounterButton"
                            disabled={options.children <= 0} 
                            onClick={ () => handleOption("children", "d") }>-</button>
                            <span className="optionCounterNumber">{options.children}</span>
                            <button className="optionCounterButton" onClick={ () => handleOption("children", "i") }>+</button>
                        </div>  
                    </div>

                    <div className="optionItem">
                        <span className="optionText">Room</span>
                        <div className="optionCounter">
                            <button className="optionCounterButton" 
                            disabled={ options.room <= 1}
                            onClick={ () => handleOption("room", "d") }>-</button>
                            <span className="optionCounterNumber">{options.room}</span>
                            <button className="optionCounterButton" onClick={ () => handleOption("room", "i") }>+</button>
                        </div>                    
                    </div>

                    </div> )}
                </div>
                

                <div className="headerSearchItem4">
                    <button className="headerButton" 
                    //search button click here brings u to next page /hotels list page
                    onClick={handleSearch}>Search</button>

                </div>

            </div> }
        </div>    
        </div>
    );
};

export default Header