const express = require('express')
const app = express()
const fetch = require('node-fetch') 
const googleMapsClient = require('@google/maps').createClient({
    key: "GoogleAPIkey",
    Promise: Promise
  })
const port = 8383
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


app.get('/', async (req, res) => { // Sort API data 
    const response = await fetch('https://hotelapi.loyalty.dev/api/hotels?destination_id=RsBU');
    const data = await response.json();
    const extractedData = data.map(hotel => ({
        id: hotel.id,
        name: hotel.name,
        address: hotel.address,
        latitude: hotel.latitude,
        longitude: hotel.longitude,
        image: hotel.image_details ? hotel.image_details.prefix + hotel.image_details.suffix : null,
        rating: hotel.rating
        }));
    
        extractedData.sort((a, b) => {
            if (a.latitude === b.latitude) {
                // if latitudes equal, sort by longitude
                return a.longitude - b.longitude;
            } else {
                // sort by latitude
                return a.latitude - b.latitude;
            }
        });

    res.send(extractedData);
});

app.get('/:location', async (req, res) => { // Based on input by user, search for locations 
    const location = req.params.location;
    try {
    // Use the Google Maps Geocoding API to get the latitude and longitude
    const geocodeResponse = await googleMapsClient.geocode({ address: location }).asPromise();
    const { lat, lng } = geocodeResponse.json.results[0].geometry.location;
    const response = await fetch('https://hotelapi.loyalty.dev/api/hotels?destination_id=RsBU&latitude=${lat}&longitude=${lng}');
    const hotels = await response.json();
    const extractedHotels = hotels.map(hotel => ({
        id: hotel.id,
        name: hotel.name,
        address: hotel.address,
        latitude: hotel.latitude,
        longitude: hotel.longitude,
        image: hotel.image_details ? hotel.image_details.prefix + hotel.image_details.suffix : null,
        rating: hotel.rating
        }));

    //const index = extractedHotels.findIndex(hotel => hotel.id === id);

    //const neighbors = extractedHotels.slice(index, index + 8);

    res.send(extractedHotels)
} catch (error) {
    console.error('An error occurred:', error);
    res.status(500).send('An error occurred while processing your request.');
}

});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});