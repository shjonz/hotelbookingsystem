import React from 'react';
import "./featured.css";
import nyimg from '../images/newyork.jpg';

const Featured = () => {
    return (
        <div className='featured'>
            
            <div className='featuredItem'>
                <img className='featuredImg' src={nyimg} alt="newyork"></img>

                <div className='featuredTitles'>
                    <h1>Dublin</h1>
                    <h2>123 properties</h2>
                </div>

            </div>



            <div className='featuredItem'>
                <img className='featuredImg' src={nyimg}></img>

                <div className='featuredTitles'>
                    <h1>Austin</h1>
                    <h2>532 properties</h2>
                </div>

            </div>



            <div className='featuredItem'>
                <img className='featuredImg' src={nyimg}></img>

                <div className='featuredTitles'>
                    <h1>Reno</h1>
                    <h2>533 properties</h2>
                </div>

            </div>

        </div>
    )
};

export default Featured