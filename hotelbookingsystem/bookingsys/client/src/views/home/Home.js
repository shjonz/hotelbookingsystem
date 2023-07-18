import React from 'react';
import "./home.css";
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import Featured from '../../components/featured/Featured';
import CountryList from '../../components/countryList/CountryList';
import FeaturedHotels from '../../components/FeaturedHotels/FeaturedHotels';
import EmailList from '../../components/emailList/EmailList';
import Footer from '../../components/Footer/Footer';

const Home = () => {
    return (
        <div>
            <Navbar />
            <Header type=""></Header>
            <div className="homeContainer">
                <Featured/>
                <h1 className='homeTitle'>Browse country</h1>
                <CountryList/>
                <h1 className='homeTitle'>Hotels Guests love</h1>
                <FeaturedHotels/>
                <EmailList/>
                <Footer/>
            </div>
        </div>
    );
};

export default Home