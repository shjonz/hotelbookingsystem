import React, { createContext, useState, useEffect } from "react";
import "./header.css";
import background from '../images/sample.jpeg';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {format} from 'date-fns';
import { useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
//import data from "../../destinations.json";
//import data from "../../dest.json";

const Header = ({type}) => {
    const UserContext = createContext();
    //const [searchTerm, setSearchTerm] = useState("");
    const [destination, setDestination] = useState("");
    //this is to open the calendar
    const [openDate, setOpenDate] = useState(false);

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

    const navigate = useNavigate();

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

    // useEffect( () => {
    //     searchBar("/").then(res => res.json()).then(data => setDestination(destination))
    // }, [])


    const handleSearch = () => {
        navigate("/hotels", { state: { destination, date, options } });
    };

    const onChange = (event) => {
        setDestination(event.target.value);
    };

    const onSearch = (searchTerm) => {
        setDestination(searchTerm);
        console.log("search ", searchTerm);
    };

    
    // useEffect( () => {
    //     console.log(' use effet on header component ' );
    //     fetch('/search?name=Singapore')
    //     .then(
    //         response => response.json()
    //     ).then(data => {
    //         console.log('inside use effect fetch ', data);
    //     })
    // }, [])
    //console.log(' data ' , data);

    const FilterFunction = (list) => {
        //const user = useContext(UserContext);
        if ( destination === "") return list;
        else if (list.term.toLowerCase().includes( destination.toLowerCase())) return list;
    }
    
    //onChange={(e) => setDestination(e.target.value)}

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
                    placeholder="Search your destination..."
                    
                    onChange={ (event) => {
                        setDestination(event.target.value);
                    } } />  
            </div>

            

            {/* <div className="dropdown">
                {data
                    .filter( (item) => {
                    const searchTerm = destination.toLowerCase();
                    const fullName = item.term.toLowerCase();

                    return (
                        searchTerm &&
                        fullName.startsWith(searchTerm) &&
                        fullName !== searchTerm
                    );
                    })
                    .slice(0, 10)
                    .map((item) => (
                    <div
                    onClick={() => searchBar(item.term)}
                    className="dropdown-row"
                    key={item.term}
                    >
                    {item.term}
                    </div>
                ))}
            </div> */}

                

            <div className="headerSearchItem2">
                <span onClick={ () => setOpenDate( !openDate ) } className="headerSearchText1">{`${format(date[0].startDate, "MM/dd/yyyy")} to 
                ${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                {openDate && <DateRange
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

                {openOptions && (
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
                    <button className="headerButton" onClick={handleSearch}>Search</button>

                </div>

            </div> }
        </div>    
        </div>
    );
};

export default Header