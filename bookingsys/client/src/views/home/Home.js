import React, {useEffect} from 'react';
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
    const animateTitles = (titleClass, animationClass) => {
        const titleElements = document.querySelectorAll(titleClass);
    
        const handleScroll = () => {
          titleElements.forEach((titleElement) => {
            const rect = titleElement.getBoundingClientRect();
            const isInViewport =
              rect.top <= window.innerHeight && rect.bottom >= 0;
    
            if (isInViewport) {
              titleElement.classList.add(animationClass);
            } else {
              titleElement.classList.remove(animationClass);
            }
          });
        };
    
        window.addEventListener("scroll", handleScroll);
    
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      };
    
      useEffect(() => {
        animateTitles(".homeTitle", "animate__slideInRight");
      }, []);
    
      useEffect(() => {
        animateTitles(".homeTitleLeft", "animate__slideInLeft");
      }, []);

    return (
        <div className="homepagecontainer" style={{
           // backgroundImage : `url(${img})`
        }}>
            <Navbar />
            <Header type=""></Header>
            
            <div className="homeContainer" >
            <EmailList/>
                <div className='homeItem'>
                <h1 className='homeTitle animate__animated animate__slideInRight'>Areas Near You</h1>
                <Featured/>
                </div>
                <div className='homeItem'>
                <h1 className='homeTitleLeft animate__animated animate__slideInLeft'>Suggested Destinations</h1>
                <CountryList/>
                </div>
                <div className='homeItem'>
                <h1 className='homeTitle animate__animated animate__slideInRight'>Popular Hotels</h1>
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