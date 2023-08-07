import React from 'react';
import "./home.css";
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import Featured from '../../components/featured/Featured';
import CountryList from '../../components/countryList/CountryList';
import FeaturedHotels from '../../components/FeaturedHotels/FeaturedHotels';
import EmailList from '../../components/emailList/EmailList';
import Footer from '../../components/Footer/Footer';
//import background from '../images/sample.jpeg';
import img from "../../components/images/biglagoon.jpg";
import Testimonials from '../../components/testimonials/testimonial';

const Home = () => {
    return (
        <div className="homepagecontainer" style={{
           // backgroundImage : `url(${img})`
        }}>
            <Navbar />
            <Header type=""></Header>
            
            <div className="homeContainer" >
            <EmailList/>
                <div className='homeItem'>
                <h1 className='homeTitle'>Areas Near You</h1>
                <Featured/>
                </div>
                <div className='homeItem'>
                <h1 className='homeTitle'>Suggested Destinations</h1>
                <CountryList/>
                </div>
                <div className='homeItem'>
                <h1 className='homeTitle'>Popular Hotels</h1>
                <FeaturedHotels/>
                </div>
                <div className='homeItem'>
                <Testimonials />
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Home