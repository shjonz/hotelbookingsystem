import "./countryList.css";
import romeimg from '../images/rome.jpg';
import data from "../../countrycodeflagname.json";
import { Link, useNavigate } from "react-router-dom";
import {useState, useContext, useEffect, useMemo} from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import {format, addDays} from 'date-fns';

const CountryList = () => {
    const {dispatch} = useContext(SearchContext);
    const [destination, setDestination] = useState("");
    const [dest_id, setDestID] = useState("");
    const [lang, setLang] = useState("en_US");
    const [currency, setCurrency] = useState("SGD");
    const [partner_id, setPartnerID] = useState("1");
    const [guests, setGuests] = useState("2");
    const [img1, setImg1] = useState("");
    const [img2, setImg2] = useState("");
    const [img3, setImg3] = useState("");
    const [countries, setCountries] = useState([]);
    
    const [options, setOptions] = useState(
        {
          adult: 1,
          children: 0,
          room: 1,
        }
      );
    
    //this is to select the dates
    const [date, setDate] = useState([
        {
          startDate: addDays(new Date(), 28),
          endDate: addDays(new Date(), 29),
          key: 'selection'
        }
      ]);
    
    const [country, setCountry] = useState("");
    
    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const navigate = useNavigate();

    useEffect(() => {
        console.log('inside use effect for dest id for countrylist ' , dest_id)
        if ( dest_id && dest_id.length > 0) {
            dispatch({ type: "NEW_SEARCH", payload: { dest_id, date, guests, lang, currency, partner_id , destination} });
            navigate("/hotels", { state: { destination, date, options, dest_id } });
        }
    }, [dest_id]);

    useEffect(() => {
        async function defaultCountry() {
            try {       
                console.log('try catch for handlesearch ', country)
                await axios.get(`http://localhost:3000/search/?name=${country}`).then((response) => {
                    console.log('inside axios, ', response.data, response.data[0].uid, response.data.slice(0,1));
                    setDestination(toString(response.data[0].name));
                    setDestID(response.data[0].uid);
                });
                
                console.log('inside use effect for country ', data[0].uid );        
            } catch (err) {
                console.log(err);
            }    
        }
        defaultCountry();
      }, [country]);

    const handleSearch = async (value) => {
        console.log('handle search for countrylist ', value)
        setCountry(value);
    };

    const country_1 = data[getRandomNumber(0, data.length - 1)];
    const country_2 = data[getRandomNumber(0, data.length - 1)];
    const country_3 = data[getRandomNumber(0, data.length - 1)];
    const array = [];
    

   

    useEffect( () => {
        async function fetchImgs() {
            console.log(' use effect for countrylist 1st country img ' );
            array.push(country_1);
            array.push(country_2);
            array.push(country_3);
            setCountries(array);
        
            //fFORE SREE N LOGGAN UNCOMMENT THREE THINGS HERE
            //const key = process.env.Access_Key
            // const data = await fetch(
            //     `https://api.unsplash.com/search/photos?page=1&query=${country_1.capital}%20tourist%20places&client_id=siJJbrgksSg9HqJ3vRdpofSNb_jJzW-3W5vhPQVqLhQ`
            // );
            // const dataJ = await data.json();
            // const result = dataJ.results[0].urls.raw;
            // //const result = dataJ.results.urls.raw;
            // console.log('result ', result );
            // setImg1(result );

            // const data_1 = await fetch(
            //     `https://api.unsplash.com/search/photos?page=1&query=${country_2.capital}%20tourist%20places&client_id=siJJbrgksSg9HqJ3vRdpofSNb_jJzW-3W5vhPQVqLhQ`
            // );
            // const dataJ1 = await data_1.json();
            // const result1 = dataJ1.results[0].urls.raw;
            // //const result = dataJ.results.urls.raw;
            // console.log('result ', result1 );
            // setImg2(result1 );

            // const data_2 = await fetch(
            //     `https://api.unsplash.com/search/photos?page=1&query=${country_3.capital}%20tourist%20places&client_id=siJJbrgksSg9HqJ3vRdpofSNb_jJzW-3W5vhPQVqLhQ`
            // );
            // const dataJ_2 = await data_2.json();
            // const result_2 = dataJ_2.results[0].urls.raw;
            // //const result = dataJ.results.urls.raw;
            // console.log('result ', result_2 );
            // setImg3(result_2 );
        }
        fetchImgs();  
    }, [] );
    
    //FOR SREE N LOGGAN CHANGE romeimg to img1
    //uncomment the 2 div className = clistItem
    return (
        <div className="clist">

            <div className="clistItem">
                <img className="clistImg" alt="rome" src={romeimg}></img>
                <div className="clistTitles" >
                    <button className="clistButton" onClick={() => handleSearch(country_1.capital)}>{country_1.name}</button>
                    <h2>Capital: {country_1.capital}</h2>
                </div>
            </div>

            {/* <div className="clistItem">
            <img className="clistImg" alt="france" src={img2}></img>
                <div className="clistTitles">
                    <button className="clistButton" onClick={() => handleSearch(country_2.capital)}>{country_2.name}</button>
                    <h2>Capital: {country_2.capital}</h2>
                </div>
            </div>

            <div className="clistItem">
            <img className="clistImg" alt="USA" src={img3}></img>
                <div className="clistTitles">
                    <button className="clistButton" onClick={() => handleSearch(country_3.capital)}>{country_3.name}</button>
                    <h2>Capital: {country_3.capital}</h2>
                </div>
            </div> */}

        </div>
    )
}

export default CountryList