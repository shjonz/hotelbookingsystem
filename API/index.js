const express = require('express')
const app = express()
const fetch = require('node-fetch') 
const googleMapsClient = require('@google/maps').createClient({
    key: "Google API Key",
    Promise: Promise
  })
const port = 8383
const fs = require('fs')

// All destinations (i.e. countries and cities) to showcase to user in dropdown box to type and match
app.get('/', async (req, res) => {
    const data = fs.readFileSync('destinations.json', 'utf8');
    const destinations = JSON.parse(data);
    const terms = destinations.map(destination => destination.term);
    const uniqueTerms = [...new Set(terms)];
    uniqueTerms.sort();
    res.send(uniqueTerms);
})

// 1. Search for destination in destination.json, return uid 
// 2. Call price and hotel APIs to get info on a list of hotels 
// E.g. http://localhost:8383/Singapore-Singapore/2023-10-01/2023-10-07/en_US/SGD/2/1
app.get('/:location/:checkin/:checkout/:lang/:currency/:guests/:partner_id', async (req, res) => {
    let location = req.params.location;
    location = location.replace(/-|_/g, ', ');
    const checkin = req.params.checkin; // YYYY-MM-DD format
    const checkout = req.params.checkout; // YYYY-MM-DD format
    const lang = req.params.lang; // E.g. “en_US”
    const currency = req.params.currency; // ISO code for currencies (E.g SGD)
    const guests = req.params.guests; // Number of guests staying per room - /* TODO: Seperator for more than one room
    const partner_id = req.params.partner_id; // 1 for now, for loyalty points

    // Get UID from destinations.json
    const data = fs.readFileSync('destinations.json', 'utf8');
    const destinations = JSON.parse(data);
    const destination = destinations.find(dest => dest.term === location);
    if (!destination) {
        res.status(404).send('No destination found for the specified location.');
        return;
    }
    // Fetch info about hotels from hotel list API
    const response = await fetch(`https://hotelapi.loyalty.dev/api/hotels?destination_id=${destination.uid}`);
    if (!response.ok) {
        console.error(`Error fetching hotel list: ${response2.status} ${response2.statusText}`);
        res.status(500).send('An error occurred while processing your request.');
        return;
    }
    const hotelData = await response.json();
    //console.log("okay");

    let country_code;
        if (hotelData.length > 0) {
            country_code = hotelData[0].original_metadata.country;
        } else {
            console.error('No hotels found for the specified destination.');
            res.status(404).send('No hotels found for the specified destination.');
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
    //console.log(hotelData.length);
// console.log(hotelData[0].original_metadata);
// console.log(hotelData[0].original_metadata.country);
// console.log(country_code);

    // Fetch prices from second prices API
    const response2 = await fetch(`https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${destination.uid}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&country_code=${country_code}&guests=${guests}&partner_id=1`);
    if (!response2.ok) {
        console.error(`Error fetching hotel list: ${response2.status} ${response2.statusText}`);
        res.status(500).send('An error occurred while processing your request.');
        return;
    }
    const hotelprices = await response2.json();
    if (hotelprices.hotels.length === 0) {
        res.status(404).send('No hotels found for the specified search criteria.');
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
    res.send(combinedData);
    console.log(combinedData);

});


//TODO: HOTEL PAGE API 
app.get('/:hotel', async (req, res) => {
    const hotelid = req.params.hotel;
    const response3 = await fetch("https://hotelapi.loyalty.dev/api/hotels/${hotelid}");
    const hotelData = await response3.json();

    res.send(hotelData);
})
//TODO: CREATE BOOKING API



app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


// Search from destinations.json - fuzzy searching to match string to fill up 
// Google Map with widget longtitude and langtitude 
// Accounts on our side (DB) - bookings, 
// MongoDB with Atlas
// Destinations.json is on our side (DB)

// API
// Hotel, Destinations, Rooms   
// API hotels
// API hotels prices
// API hotels ids


// app.get('/', async (req, res) => { // Sort API data 
//     const response = await fetch('https://hotelapi.loyalty.dev/api/hotels?destination_id=RsBU');
//     const data = await response.json();
//     const extractedData = data.map(hotel => ({
//         id: hotel.id,
//         name: hotel.name,
//         address: hotel.address,
//         latitude: hotel.latitude,
//         longitude: hotel.longitude,
//         image: hotel.image_details ? hotel.image_details.prefix + hotel.image_details.suffix : null,
//         rating: hotel.rating
//         }));
    
//         extractedData.sort((a, b) => {
//             if (a.latitude === b.latitude) {
//                 // if latitudes equal, sort by longitude
//                 return a.longitude - b.longitude;
//             } else {
//                 // sort by latitude
//                 return a.latitude - b.latitude;
//             }
//         });

//     res.send(extractedData);
// });

// // Form for getting hotels 
// app.get('/:country/:checkin/:checkout/:lang/:currency/:guests/:partner_id', async (req, res) => { // Based on input by user, search for locations 
//     let country = req.params.country;
//     // Replace hyphen or underscore back to a comma and space
//     country = country.replace(/-|_/g, ', ');
//     const checkin = req.params.checkin; // YYYY-MM-DD format
//     const checkout = req.params.checkout; // YYYY-MM-DD format
//     const lang = req.params.lang; // E.g. “en_US”
//     const currency = req.params.currency; // ISO code for currencies (E.g SGD)
//     const guests = req.params.guests; // Number of guests staying per room - /* TODO: Seperator for more than one room
//     const partner_id = req.params.partner_id; // 1 for now, for loyalty points

//     // Get UID from destinations.json
//     fs.readFile('destinations.json', 'utf8', (err, data) => {
//         if (err) {
//             console.error('Error reading file:', err);
//             res.status(500).send('An error occurred while processing your request.');
//             return;
//         }
//         const destinations = JSON.parse(data);
//         console.log(destinations);

//         const destination = destinations.find(destination => destination.term === country);
//         if (destination) {
//             //res.send(destination.uid);
//         } else {
//             res.status(404).send('No destination found for the specified country.');
//         }
//     });

//     // Fetch prices from prices API
//     const response = await fetch('https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${destination}&checkin=${checkin}&checkout=${checkout}&lang=${lang}&currency=${currency}&guests=${guests}&partner_id=1'
//     )
//     const hotelprices = await response.json()
//     console.log(hotelprices);
//     if (hotelprices.hotels.length === 0) {
//         res.status(404).send('No hotels found for the specified search criteria.');
//         return;
//     }

//     const extractedHotelprices = hotelprices.map(hotel => ({
//         id: hotel.id,
//         searchRank: hotel.searchRank,
//         price: hotel.price,
//         market_rates: hotel.market_rates,
//         }));

//     // Fetch info about hotels from second API
//     const response2 = await fetch('https://hotelapi.loyalty.dev/api/hotels?destination_id=${country}')
//     const hotelData = await response2.json()
//     const hotels = hotelData.map(hotel => ({
//         id:hotel.id,
//         name: hotel.name,
//         address: hotel.address,
//         latitude: hotel.latitude,
//         longitude: hotel.longitude,
//         image: hotel.image_details ? hotel.image_details.prefix + hotel.image_details.suffix : null,
//         rating: hotel.rating
//     }));

//     // Combine the data from the two APIs
//     const combinedData = hotels.map(hotel => {
//         const priceData = extractedHotelprices.find(price => price.id === hotel.id);
//         return {
//             ...hotel,
//             ...priceData
//         };
    
// });
    



    // const response = await fetch('https://hotelapi.loyalty.dev/api/hotels?destination_id={destination}');

    // const hotels = await response.json();

    // // Fetch destinations using lat and lng

    // const extractedHotels = hotels.map(hotel => ({
    //     id: hotel.id,
    //     name: hotel.name,
    //     address: hotel.address,
    //     latitude: hotel.latitude,
    //     longitude: hotel.longitude,
    //     image: hotel.image_details ? hotel.image_details.prefix + hotel.image_details.suffix : null,
    //     rating: hotel.rating
    //     }));

    // res.send(extractedHotels)


// });


// app.get('/:location', async (req, res) => { // Based on input by user, search for locations 
//     const location = req.params.location;
//     try {
//     // Use the Google Maps Geocoding API to get the latitude and longitude
//     const geocodeResponse = await googleMapsClient.geocode({ address: location }).asPromise();

//     if (geocodeResponse.json.results && geocodeResponse.json.results.length > 0) {
//         const { lat, lng } = geocodeResponse.json.results[0].geometry.location;
//     } else {
//         console.error('No results found for location:', location);
//         res.status(404).send('No results found for the specified location.');
//     }
//     const countryid = await fetch('destinations.json');
//     // Fetch destinations using lat and lng
//     const response = await fetch('https://hotelapi.loyalty.dev/api/hotels?destination_id=RsBU&latitude=${lat}&longitude=${lng}');
//     const hotels = await response.json();
//     const extractedHotels = hotels.map(hotel => ({
//         id: hotel.id,
//         name: hotel.name,
//         address: hotel.address,
//         latitude: hotel.latitude,
//         longitude: hotel.longitude,
//         image: hotel.image_details ? hotel.image_details.prefix + hotel.image_details.suffix : null,
//         rating: hotel.rating
//         }));

//     //const index = extractedHotels.findIndex(hotel => hotel.id === id);

//     //const neighbors = extractedHotels.slice(index, index + 8);

//     res.send(extractedHotels)

//     // Need to fetch from price API


// } catch (error) {
//     console.error('An error occurred:', error);
//     res.status(500).send('An error occurred while processing your request.');
// }

// });

