import express, { response } from "express";

const router = express.Router();

// Searches for a list of hotels based on the UID of the destination. Obtain this using the above 2 endpoints. Your choice.
router.get("/default", hotelList, (req, res) => {
    res.send(res.hotelList)
})

// Searches for a specific hotel based on its UID.
router.get("/default/:uid", hotelSearch, (req, res) => {
    res.send(res.hotelSearch)
})

router.get("/prices", hotelListPrices, (req, res) => {
    res.send(res.hotelListPrices)
})

router.get("/:uid/prices", hotelSearchPrices, (req, res) => {
    res.send(res.hotelSearchPrices)
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
    let list_response;
    let list;
    let price_response;
    let price;
    let cc;

    try {
        const price_completed = false;
        list_response = await fetch(`https://hotelapi.loyalty.dev/api/hotels?destination_id=${req.query.destination_id}`);
        if (!list_response.ok) {
            console.error(`Error fetching hotel list: ${response2.status} ${response2.statusText}`);
            res.status(500).send('An error occurred while processing your request.');
            return;
        }
        list = await list_response.json();
        cc = list[0].original_metadata.country;

        // Idk why I have to do this but fuck you Ascenda
        price_response = await fetch(`https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${req.query.destination_id}&checkin=${req.query.checkin}&checkout=${req.query.checkout}&lang=${req.query.lang}&currency=${req.query.currency}&country_code=${cc}&guests=${req.query.guests}&partner_id=1`);
        price = await price_response.json();  
        while (price.completed == false) {
            price_response = await fetch(`https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${req.query.destination_id}&checkin=${req.query.checkin}&checkout=${req.query.checkout}&lang=${req.query.lang}&currency=${req.query.currency}&country_code=${cc}&guests=${req.query.guests}&partner_id=1`);
            price = await price_response.json();   
        }

        
             

    } catch (e) {res.send(e);}

    res.hotelListPrices = price;
    next();
}

async function hotelSearchPrices(req, res, next) {
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

    res.hotelSearchPrices = results;
    next();
}

export default router