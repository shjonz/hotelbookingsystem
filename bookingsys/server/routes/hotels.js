import express, { response } from "express";

const router = express.Router();

// Searches for a list of hotels based on the UID of the destination.
// http://localhost:8800/api/hotels/default?destination_id=WD0M
router.get("/default", hotelList, (req, res) => {
    res.status(200).send(res.hotelList)
})

// Searches for a specific hotel based on its UID.
// http://localhost:8800/api/hotels/default/diH7
router.get("/default/:uid", hotelSearch, (req, res) => {
    res.status(200).send(res.hotelSearch)
})

// Searches for a list of hotels based on UID of destination, extracts its prices and gives it back.
// localhost:8800/api/hotels/prices?destination_id=WD0M&checkin=2023-10-01&checkout=2023-10-07&lang=en_US&currency=SGD&guests=2&partner_id=1
router.get("/prices", hotelListPrices, (req, res) => {
    res.status(200).send(res.hotelListPrices)
})

// Searches for a specific hotel based on its UID, follows same parameters as the above route so remember to save state. **DOES NOT RETURN HOTEL DETAILS**
// localhost:8800/api/hotels/price?uid=diH7&destination_id=WD0M&checkin=2023-10-01&checkout=2023-10-07&lang=en_US&currency=SGD&guests=2&partner_id=1
router.get("/price", hotelSearchPrices, (req, res) => {
    res.status(200).send(res.hotelSearchPrices)
})

// Function Space

async function hotelList(req, res, next) {
    let results;
    try {
        const response = await fetch(`https://hotelapi.loyalty.dev/api/hotels?destination_id=${req.query.destination_id}`)
        if (!response.ok) {
            console.error(`Error fetching hotel list: ${response2.status} ${response2.statusText}`);
            res.status(500).send('An error occurred while processing your request.');
            return;
        }
        results = await response.json()
    } catch (e) {res.send(e);}

    res.hotelList = results;
    next();
}

async function hotelSearch(req, res, next) {
    let results;
    try {
        const response = await fetch(`https://hotelapi.loyalty.dev/api/hotels/${req.params.uid}`)
        if (!response.ok) {
            console.error(`Error fetching hotel list: ${response2.status} ${response2.statusText}`);
            res.status(500).send('An error occurred while processing your request.');
            return;
        }
        results = await response.json()
    } catch (e) {res.send(e);}

    res.hotelSearch = results;
    next();
}

async function hotelListPrices(req, res, next) {
    let prices;
    let list;

    const response = await fetch(`https://hotelapi.loyalty.dev/api/hotels?destination_id=${req.query.destination_id}`)
    list = await response.json()


    const cc = list[0].original_metadata.country; //reverted

 
//     try {
//         if (!list || list.length === 0) {
//             next();
//             return;
//         }
//         cc = list[0].original_metadata.country;
//     } catch (error) {
//         next();
//         return
//     }


    // Idk why I have to do thi
    let price_response = await fetch(`https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${req.query.destination_id}&checkin=${req.query.checkin}&checkout=${req.query.checkout}&lang=${req.query.lang}&currency=${req.query.currency}&country_code=${cc}&guests=${req.query.guests}&partner_id=1`)
    prices = await price_response.json()

    while (prices.completed == false) {
        price_response = await fetch(`https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${req.query.destination_id}&checkin=${req.query.checkin}&checkout=${req.query.checkout}&lang=${req.query.lang}&currency=${req.query.currency}&country_code=${cc}&guests=${req.query.guests}&partner_id=1`)
        prices = await price_response.json()
    }
    

    // Merging both
    const hotels_list = list.map(hotel => ({
        id: hotel.id,
        name: hotel.name,
        address: hotel.address,
        latitude: hotel.latitude,
        longitude: hotel.longitude,
        image: hotel.image_details ? hotel.image_details.prefix + hotel.image_details.suffix : null,
        rating: hotel.rating,
        country: hotel.original_metadata.country,
    }));

    const hotels_prices = prices.hotels.map(hotel => ({
        id: hotel.id,
        searchRank: hotel.searchRank,
        price: hotel.price,
        market_rates: hotel.market_rates,
    }));

    const hotelListPrices = hotels_list.map(list => {
        const priceData = hotels_prices.find(price => price.id === list.id);
        return {
            ...list,
            ...priceData
        };
    });

    res.hotelListPrices = hotelListPrices.filter(hotel => hotel.price !== undefined);
    next();
}

async function hotelSearchPrices(req, res, next) {
    let search;
    let price;

    const response = await fetch(`https://hotelapi.loyalty.dev/api/hotels/${req.query.uid}`)
    search = await response.json()

    const cc = search.original_metadata.country;

    // Idk why I have to do this but fuck you Ascenda
    let price_response = await fetch(`https://hotelapi.loyalty.dev/api/hotels/${req.query.uid}/price?destination_id=${req.query.destination_id}&checkin=${req.query.checkin}&checkout=${req.query.checkout}&lang=${req.query.lang}&currency=${req.query.currency}&country_code=${cc}&guests=${req.query.guests}&partner_id=1`);
    price = await price_response.json();

    while (price.completed == false) {
        price_response = await fetch(`https://hotelapi.loyalty.dev/api/hotels/${req.query.uid}/price?destination_id=${req.query.destination_id}&checkin=${req.query.checkin}&checkout=${req.query.checkout}&lang=${req.query.lang}&currency=${req.query.currency}&country_code=${cc}&guests=${req.query.guests}&partner_id=1`);
        price = await price_response.json();
    }

    res.hotelSearchPrices = price;
    next();
}

export default router