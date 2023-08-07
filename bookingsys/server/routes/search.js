import express, { response } from "express";

import Destinations from "../models/Destinations.js";

const router = express.Router();

// Basic search function. Use + over spaces when trying to query from here thank you. This returns name, uid and the _id of the destination so you can use it elsewhere.
router.get("/", searchBar, (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:8800');
    res.status(200).json(res.results)
})

// Destination search gives you your uid that you need for your parsing. Search using the unique _id of the destination.
router.get("/dest/id", destIDSearch, (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:8800');
    res.status(200).json(res.destID.uid)
})

// Destination search gives you your uid that you need for your parsing. Search using the name of the destination.
router.get("/dest/name", destNameSearch, (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:8800');
    res.status(200).json(res.destName.uid)
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
            results = await Destinations.aggregate(agg)}
    } catch (e) {res.send(e);}


    if (results) {


        res.code = 200
    } else {
        res.code = 404
    }

    res.results = results;
    next();
}

async function destIDSearch(req, res, next) {
    let destID;
    try {
        destID = await Destinations.findById(req.query.id)
    } catch (e) {res.send(e);}

    res.destID = destID;
    next();
}

async function destNameSearch(req, res, next) {
    let destName;
    try {
        destName = await Destinations.findOne({"name": req.query.name})
    } catch (e) {res.send(e);}

    res.destName = destName;
    next();
}

export default router