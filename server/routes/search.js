import express, { response } from "express";

import destination from "../models/destination.js";

const router = express.Router();

// Basic search function. Use + over spaces when trying to query from here thank you. This returns name, uid and the _id of the destination so you can use it elsewhere.
router.get("/", searchBar, (req, res) => {
    res.send(res.results)
})

// Destination search gives you your uid that you need for your parsing. Search using the unique _id of the destination.
router.get("/dest/id", destIDSearch, (req, res) => {
    res.send(res.destID.uid)
})

// Destination search gives you your uid that you need for your parsing. Search using the name of the destination.
router.get("/dest/name", destNameSearch, (req, res) => {
    res.send(res.destName.uid)
})

// // Searches for a list of hotels based on the UID of the destination. Obtain this using the above 2 endpoints. Your choice.
// router.get("/hotels", hotelList, (req, res) => {
//     res.send(res.hotelList)
// })

// // Searches for a specific hotel based on its UID.
// router.get("/hotels/:uid", hotelSearch, (req, res) => {
//     res.send(res.hotelSearch)
// })

router.get("/hotels/prices", hotelListPrices, (req, res) => {
    res.send(res.hotelListPrices)
})

router.get("/hotels/:uid/prices", hotelSearchPrices, (req, res) => {
    res.send(res.hotelSearchPrices)
})

// Function Space

async function searchBar(req, res, next) {
    let results;
    try {
        if (req.query.name) { 
            // Define Aggregate Pipeline
            const agg = [
            {$search: {index: "autoSearch", autocomplete: {query: req.query.name, path: "name", fuzzy: { maxEdits: 1 }, tokenOrder: "sequential"}}},
            {$limit: 10},
            {$project: {
                _id: 1,
                name: 1,
                uid: 1,
                }}
            ];
            // Run Pipeline
            results = await destination.aggregate(agg)}
    } catch (e) {res.send(e);}

    res.results = results;
    next();
}

async function destIDSearch(req, res, next) {
    let destID;
    try {
        destID = await destination.findById(req.query.id)
    } catch (e) {res.send(e);}

    res.destID = destID;
    next();
}

async function destNameSearch(req, res, next) {
    let destName;
    try {
        destName = await destination.findOne({"name": req.query.name})
    } catch (e) {res.send(e);}

    res.destName = destName;
    next();
}

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

        price_response = await fetch(`https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${req.query.destination_id}&checkin=${req.query.checkin}&checkout=${req.query.checkout}&lang=${req.query.lang}&currency=${req.query.currency}&country_code=${cc}&guests=${req.query.guests}&partner_id=1`);
        price_response = await fetch(`https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=${req.query.destination_id}&checkin=${req.query.checkin}&checkout=${req.query.checkout}&lang=${req.query.lang}&currency=${req.query.currency}&country_code=${cc}&guests=${req.query.guests}&partner_id=1`);
        price = await price_response.json();        

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