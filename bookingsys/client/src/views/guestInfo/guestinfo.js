import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import guestInfo from '../../components/payment/guestInfo';
import Footer from '../../components/Footer/Footer';



const GuestInfo = () => {
    return (
        <div>
            <Navbar />
            <Header type=""></Header>
            <div className="homeContainer">
                <guestInfo />
                <Footer/>
            </div>
        </div>
    );
};

export default guestInfo;