import "./header.css";
import background from '../images/sample.jpeg';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { useState } from "react";
import {format} from 'date-fns';


const Header = (type) => {
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
      
    return (
        <div className="header" style={{
            backgroundImage : `url(${background})`
        }} >
        <div className={type === "list" ? "headerContainer listMode" : "headerContainer"}>
        { type !== "list" && 
            <div className="headerSearch">
                <div className="headerSearchItem1">
                    <input className="headerSearchInput" type="text" 
                    placeholder="Search for your Destination" />

                </div>
                <div className="headerSearchItem2">
                    <span onClick={ () => setOpenDate( !openDate ) } className="headerSearchText">{`${format(date[0].startDate, "MM/dd/yyyy")} to 
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
                    className="headerSearchText">{`${options.adult} adult ${options.children} children 
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
                    <button className="headerButton">Search</button>

                </div>

            </div> }
        </div>    
        </div>
    );
};

export default Header