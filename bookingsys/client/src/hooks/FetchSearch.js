import { useEffect, useState } from "react";
import axios from "axios";
import destdata from "../destinations.json";
//import fs from "fs";


const FetchSearch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect( () => {
    const fetchData = async () => {
      setLoading(true);
      try {

        const location = "Singapore, Singapore";
        const checkin = "2023-10-15";
        const checkout = "2023-10-20";
        const lang = "en_US";
        const guests = "2";
        const partner_id = "1";
        const currency = "SGD";

        // Get UID from destinations.json
        const destinations = JSON.parse(data);
        const destination = destinations.find(dest => dest.term === location);
        if (!destination) {
            console.log("error");
            return;
        }
    // Fetch info about hotels from hotel list API
        const response = await fetch(`https://hotelapi.loyalty.dev/api/hotels?destination_id=${destination.uid}`);
        if (!response.ok) {
            console.error(`Error fetching hotel list: ${response2.status} ${response2.statusText}`);
            //res.status(500).send('An error occurred while processing your request.');
            return;
        }
        const hotelData = await response.json();
    //console.log("okay");

        let country_code;
            if (hotelData.length > 0) {
                country_code = hotelData[0].original_metadata.country;
            } else {
                console.error('No hotels found for the specified destination.');
                //res.status(404).send('No hotels found for the specified destination.');
                return;
            }
        const hotels = hotelData.map(hotel => ({
            id: hotel.id,
            name: hotel.name,
            address: hotel.address,
            latitude: hotel.latitude,
            longitude: hotel.longitude,
            image: hotel.image_details ? hotel.image_details.prefix + hotel.image_details.suffix : null,
            rating: hotel.rating,
            country: hotel.original_metadata.country,
        }));

    // Fetch prices from second prices API
        const response2 = await fetch(`https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${destination.uid}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&country_code=${country_code}&guests=${guests}&partner_id=1`);
        if (!response2.ok) {
            console.error(`Error fetching hotel list: ${response2.status} ${response2.statusText}`);
            //res.status(500).send('An error occurred while processing your request.');
            return;
        }
        const hotelprices = await response2.json();
        if (hotelprices.hotels.length === 0) {
            console.log("prices error");
            //res.status(404).send('No hotels found for the specified search criteria.');
            return;
        }
        const extractedHotelprices = hotelprices.hotels.map(hotel => ({
            id: hotel.id,
            searchRank: hotel.searchRank,
            price: hotel.price,
            market_rates: hotel.market_rates,
        }));
        console.log("okay");


    // Combine the data from the two APIs
        const combinedData = hotels.map(hotel => {
            const priceData = extractedHotelprices.find(price => price.id === hotel.id);
            return {
                ...hotel,
                ...priceData
            };
        });
    // Send data containing hotels - So far only tested for Singapore 
        //res.send(combinedData);
        console.log(combinedData);


        } catch (err) {
            setError(err);
        }
        setLoading(false);
        };
        fetchData();
    }, []);

    return {data, loading ,error}
  //return { data, loading, error, reFetch };
};

export default FetchSearch;



// 1. Search for destination in destination.json, return uid 
// 2. Call price and hotel APIs to get info on a list of hotels 
// E.g. http://localhost:8383/Singapore-Singapore/2023-10-01/2023-10-07/en_US/SGD/2/1
//app.get('/:location/:checkin/:checkout/:lang/:currency/:guests/:partner_id', async (req, res) => {
    

//});