import React from 'react';
import "./featuredHotels.css";
import hotelImg from '../images/hotel.jpg'

const FeaturedHotels = () => {
    return (
        <div className='fh'>
            <div className='fhItem'>
                <img alt='featuredhotel' src={hotelImg}></img>
                <span className='fhName'>Aparthotel Stare Miasto</span>
                <span className='fhCity'>Madrid</span>
                <span className='fhPrice'>Starting from $120</span>
                <div className="fhRating">
                    <button>8.9</button>
                    <span>Excellent</span>
                </div>
            </div>


            <div className='fhItem'>
                <img alt='featuredhotel' src={hotelImg}></img>
                <span className='fhName'>Aparthotel Stare Miasto</span>
                <span className='fhCity'>Madrid</span>
                <span className='fhPrice'>Starting from $120</span>
                <div className="fhRating">
                    <button>8.9</button>
                    <span>Excellent</span>
                </div>
            </div>


            <div className='fhItem'>
                <img className='fhImg' alt='featuredhotel' src={hotelImg}></img>
                <span className='fhName'>Aparthotel Stare Miasto</span>
                <span className='fhCity'>Madrid</span>
                <span className='fhPrice'>Starting from $120</span>
                <div className="fhRating">
                    <button>8.9</button>
                    <span>Excellent</span>
                </div>
            </div>
        </div>
    )
}

export default FeaturedHotels