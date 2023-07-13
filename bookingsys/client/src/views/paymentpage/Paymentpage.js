import React from 'react';
import Navbar from '../../components/navbar/Navbar';
import Header from '../../components/header/Header';
import Payment from '../../components/payment/Payment';
import Footer from '../../components/Footer/Footer';

const PaymentPage = () => {
    return (
        <div>
            <Navbar />
            <Header type=""></Header>
            <div className="homeContainer">
                <Payment />
                <Footer/>
            </div>
        </div>
    );
};

export default PaymentPage;