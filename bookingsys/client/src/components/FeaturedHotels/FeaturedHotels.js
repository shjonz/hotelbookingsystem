import React from 'react';
import "./featuredHotels.css";
import hotelImg from '../images/hotel.jpg'

const FeaturedHotels = () => {
    //incomplete additional feature, should recommend diff hotels based on country/destination. for now its hardcoded
    return (
        <div className='fh'>
            <div className='fhItem'>
            <img className='fhImg' alt='featuredhotel' src={hotelImg}></img>
                <div className='fhDetails'>
                <span className='fhName'>Aparthotel Stare Miasto</span>
                <span className='fhCity'>Madrid</span>
                <span className='fhPrice'>Starting from $120</span>
                <div className="fhRating">
                    <button>8.9</button>
                    <span>Excellent</span>
                    </div>
                </div>
            </div>


            <div className='fhItem'>
            <img className='fhImg' alt='featuredhotel' src={hotelImg}></img>
                <div className='fhDetails'>
                <span className='fhName'>Aparthotel Stare Miasto</span>
                <span className='fhCity'>Madrid</span>
                <span className='fhPrice'>Starting from $120</span>
                <div className="fhRating">
                    <button>8.9</button>
                    <span>Excellent</span>
                    </div>
                </div>
            </div>


            <div className='fhItem'>
                <img className='fhImg' alt='featuredhotel' src={hotelImg}></img>
                <div className='fhDetails'>
                <span className='fhName'>Aparthotel Stare Miasto</span>
                <span className='fhCity'>Madrid</span>
                <span className='fhPrice'>Starting from $120</span>
                <div className="fhRating">
                    <button>8.9</button>
                    <span>Excellent</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeaturedHotels