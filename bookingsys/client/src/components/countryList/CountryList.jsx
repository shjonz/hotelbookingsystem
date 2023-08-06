import "./countryList.css";
import romeimg from '../images/rome.jpg';
import data from "../../countrycodeflagname.json";
import { Link, useNavigate } from "react-router-dom";
import {useState, useContext, useEffect} from "react";
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
          startDate: new Date(),
          endDate: addDays(new Date(), 1),
          key: 'selection'
        }
      ]);

    //console.log(' countrylist ', date[0].startDate, date[0].endDate);
    
    const [country, setCountry] = useState("");
    
    const getRandomNumber = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const navigate = useNavigate();

    useEffect(() => {
        async function defaultCountry() {
            try {       
                console.log('try catch for handlesearch ', country)
                const { data } = await axios.get(`http://localhost:3000/search/?name=${country}`);
                console.log('inside use effect for country ', data[0].uid);
                console.log(data)
                setDestID(data[0].uid);

                // const today = new Date();
                // const month = today.getMonth() + 1;
                // const year = today.getFullYear();
                // const date2 = today.getDate();
                // const date3 = today.getDate() + 1;
                // const currentDate = month + "/" + date2 + "/" + year;
                // const currentDate2 = month + "/" + date3 + "/" + year;
                // console.log(currentDate, currentDate2);

                //setDate([{
                //    startDate: currentDate,
                //    endDate: currentDate2,
                //    key: 'selection'
                //}])
    //`${month}/${date}/${year}`;
                setDestination(data[0].name);
                console.log('inside use effect for country, ', data[0].uid, data[0].name)
                dispatch({type: "NEW_SEARCH", payload: {dest_id, date, guests, lang, currency, partner_id}});
                navigate("/hotels", { state: { destination, date, options, dest_id } });
                
                
            } catch (err) {
                console.log(err);
            }  
        }

        defaultCountry();
        // const timer = setTimeout(() => {
        //     defaultCountry();
        // }, 8000);
        // // Trigger the fetch
        // return () => clearTimeout(timer);
      }, [country]);

      const handleSearch = async (value) => {
        console.log('handle search for countrylist ', value)
        setCountry(value);
    };

    

    //console.log('date ');
    //console.log(dest_id, date[0].startDate, date[0].endDate, destination, date);
    const country_1 = data[getRandomNumber(0, data.length - 1)];
    const country_2 = data[getRandomNumber(0, data.length - 1)];
    const country_3 = data[getRandomNumber(0, data.length - 1)];

    return (
        <div className="clist">

            <div className="clistItem">
                <img className="clistImg" alt="rome" src={romeimg}></img>
                <div className="clistTitles" >
                    <button onClick={() => handleSearch(country_1.capital)}>{country_1.name}</button>
                    <h2>Capital: {country_1.capital}</h2>
                </div>
            </div>

            <div className="clistItem">
            <img className="clistImg" alt="france" src={romeimg}></img>
                <div className="clistTitles">
                    <h1>{country_2.name}</h1>
                    <h2>Capital: {country_2.capital}</h2>
                </div>
            </div>

            <div className="clistItem">
            <img className="clistImg" alt="USA" src={romeimg}></img>
                <div className="clistTitles">
                    <h1>{country_3.name}</h1>
                    <h2>Capital: {country_3.capital}</h2>
                </div>
            </div>

        </div>
    )
}

export default CountryList