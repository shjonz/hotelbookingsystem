import React, { createContext, useState, useEffect, useContext } from "react";
import "./header.css";
import background from '../images/sample.jpeg';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format, addDays} from 'date-fns';
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { SearchContext } from "../../context/SearchContext";

const Header = ({type}) => {
    const {dispatch} = useContext(SearchContext);
    const location = useLocation();
    const [showDropdown, setShowDropdown] = useState(false);
    //use state this one go search yourself its v useful
    const [destination, setDestination] = useState("");
    const [dest_id, setDestID] = useState("");
    const [lang, setLang] = useState("en_US");
    const [currency, setCurrency] = useState("SGD");
    const [partner_id, setPartnerID] = useState("1");
    const [guests, setGuests] = useState("2");

    //this is to open the calendar
    const [openDate, setOpenDate] = useState(false);
    const [dropDownList, setDropdownList] = useState([]);
    const [isClicked, setIsClicked] = useState(false);


    //this is to select the dates
    const [date, setDate] = useState([
        {
          startDate: new Date(),
          endDate: addDays(new Date(), 1),
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
        if (isClicked) {
            dispatch({type: "NEW_SEARCH", payload: {dest_id, date, guests, lang, currency, partner_id}});
            navigate("/hotels", { state: { destination, date, options, dest_id } });
        } else {
            alert('pls click on one of the dropdown list ');
        }
        
    };

    const handleRefresh = () => {
        dispatch({type: "RESET_SEARCH"});
        dispatch({type: "NEW_SEARCH", payload: {dest_id, date, guests, lang, currency, partner_id, destination}})
    }

    //this is used to change the dropdown list when i click on the dropdown list suggestions
    const onSearch = (searchTerm) => {
        
        const item_json = dropDownList.find( ({ name }) => name === searchTerm );
        setDestination(searchTerm);
        setDestID(item_json.uid);
        setIsClicked(true);
        //console.log("onSearch for header component lemme see whats inside ", searchTerm.uid);
    };

    // useEffect(() => {
    //     async function handleChangeinsearch(value) {
            
    //         }
    //     // Trigger the fetch
    //     handleChangeinsearch();
    //   }, [value]);
    
    //this is what links to the backend, for backend check the server/routes/search.js as well as server/server.js
    const fetchData = async (value) => {
        try {
            await fetch(`/search?name=${value}`)
            .then( (response) => response.json() )
            .then( (data) => {

                const results = data.filter( (item) => {
                    return (
                    value && 
                    item && 
                    item.name
                    //item.name.toLowerCase().includes(value.toLowerCase())
                    );
                });
                
                setDropdownList(results);
                
                //console.log('lemme see results: ', results);
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
        fetchData(value);
        //console.log('dropDownList[0]: ', dropDownList[0])
        setDestination(value);
    }

    return (
        
        <div className={type === "list" ? "listMode" : "nonListMode"}>
        { type !== "list" && 
        <div className="headerImg" style={{
            backgroundImage : `url(${background})`
        }} >

            <div className="headerSearch">

                <div className="headerSearchItem">
                    <label>Destination</label>
                    <input className="headerSearchInput" 
                    type="text" 
                    //this is the input 
                    placeholder="Search your destination..."
                    value = {destination}
                    onChange={ (e) => handleChange(e.target.value) } 
                    onFocus={() => setShowDropdown(true)} // Show the dropdown when the input is focused
                    /> 
                    
            </div> 

            <div className="dropdown" style={{ display: showDropdown ? 'flex' : 'none' }}>
                {dropDownList
                    .map( (item) => (
                        //this is responsible for drop down that appears
                    <div
                    className="dropdown-row"
                    key={item.uid}
                    onClick={() => {
                        onSearch(item.name);
                        setShowDropdown(false); // Hide the dropdown when an item is clicked
                    }}
                    >
                    {item.name}
                    </div>
                ))}
            </div> 


            <div className="headerSearchItem">
                <span onClick={ () => setOpenDate( !openDate ) } className="headerSearchText">{`${format(date[0].startDate, "yyyy-MM-dd")} to 
                ${format(date[0].endDate, "yyyy-MM-dd")}`}</span>
                {openDate && <DateRange
                    //this is ur calendar that opens when u click the dates 
                    editableDateInputs = {true}
                    onChange = { (item) => setDate( [item.selection] ) }
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                    className="date"
                    minDate={new Date()}
                /> }
            </div>


            <div className="headerSearchItem">
                <span onClick={ () => setOpenOptions( !openOptions ) }
                className="headerSearchText">{`${options.adult} adult ${options.children} children 
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
                

                    <button className="headerButton" 
                    //search button click here brings u to next page /hotels list page
                    onClick={handleSearch}>Search</button>

            </div> 
            </div>}


            { type === "list" && 
        <div className="listSearch">
        <h1 className="lsTitle">Search</h1>

        <div className="lsItem">
          <label>Destination</label>
          <input placeholder={location.state.destination} 
          type="text" 
          value = {destination}
          onChange={ (e) => handleChange(e.target.value) } 
          onFocus={() => setShowDropdown(true)} // Show the dropdown when the input is focused
          />  
          </div>
          
          <div className="dropdown" style={{ display: showDropdown ? 'block' : 'none' }}>
      {dropDownList
          .map( (item) => (
              //this is responsible for drop down that appears
          <div
          className="dropdown-row"
          key={item.uid}
          onClick={() => {
              onSearch(item.name);
              setShowDropdown(false); // Hide the dropdown when an item is clicked
          }}
          >
          {item.name}
          </div>
      ))}
  </div> 

        <div className="lsItem">
          <label>Check-in Date</label>
          <span onClick={() => setOpenDate(!openDate)}>{`${format(
            date[0].startDate,
            "yyyy-MM-dd" //this is the dates that will open up when u click
          )} to ${format(date[0].endDate, "yyyy-MM-dd")}`}</span>
          {openDate && (
            <DateRange
              onChange={(item) => setDate([item.selection])}
              minDate={new Date()}
              ranges={date}
            />
          )}
        </div>

        <div className="lsItem">
          <label>Options</label>

          <div className="lsOptions">
            <div className="lsOptionItem">
              <span className="lsOptionText">Adult</span>
              <input
                type="number"
                min={1}
                className="lsOptionInput"
                placeholder={options.adult}
              />
            </div>

            <div className="lsOptionItem">
              <span className="lsOptionText">Children</span>
              <input
                type="number"
                min={0}
                className="lsOptionInput"
                placeholder={options.children}
              />
            </div>

            <div className="lsOptionItem">
              <span className="lsOptionText">Room</span>
              <input
                type="number"
                min={1}
                className="lsOptionInput"
                placeholder={options.room}
              />
            </div>
          </div>
        </div>
        <button //this is the search enginer at the side
          onClick={handleRefresh}>
          Search
        </button>
      </div>}


        </div>    
        
    );
};

export default Header