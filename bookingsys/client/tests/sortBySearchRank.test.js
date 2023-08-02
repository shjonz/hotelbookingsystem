import { sortBySearchRank } from '../src/views/hotelsList/HotelsList.js';

import axios from 'axios';
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

// Mock API call
jest.mock('./api', () => ({
  getHotels: jest.fn(() => Promise.resolve({
    data: [
      {"id":"h3z1","searchRank":0.95,"price_type":"multi","max_cash_payment":1758.63,"coverted_max_cash_payment":2374.19,"points":59350,"bonuses":0,"bonus_programs":[],"bonus_tiers":[],"lowest_price":1758.63,"price":2374.19,"converted_price":2374.19,"lowest_converted_price":2374.19,"market_rates":[{"supplier":"expedia","rate":2059.6873781885}]},
      {"id":"WaXd","searchRank":0.91,"price_type":"multi","max_cash_payment":2208.1,"coverted_max_cash_payment":2980.98,"points":74500,"bonuses":0,"bonus_programs":[],"bonus_tiers":[],"lowest_price":2208.1,"price":2980.98,"converted_price":2980.98,"lowest_converted_price":2980.98,"market_rates":[{"supplier":"expedia","rate":2681.574805196}]},
      {"id":"UcCS","searchRank":0.95,"price_type":"multi","max_cash_payment":1137.23,"coverted_max_cash_payment":1535.29,"points":38375,"bonuses":0,"bonus_programs":[],"bonus_tiers":[],"lowest_price":1137.23,"price":1535.29,"converted_price":1535.29,"lowest_converted_price":1535.29,"market_rates":[{"supplier":"expedia","rate":1320.1185726675}]}
        ]
  }))
}));

//  const sortedHotels = memoizedFilteredHotels.sort(sortBySearchRank);

beforeAll(async () => {
  // Setup: connect to the database before all tests run
  mongoose.connect(process.env.MONGO);
  const db = mongoose.connection;
  db.on('error', (error) => console.error(error));
  db.once('open', (error) => console.log("Connected to Database"));
});

afterAll(async () => {
  // Teardown: close the database connection after all tests have run
  await db.close();
});

test('database operation', async () => {
  // Your test code here
  const data = await fetch(
    "https://hotelapi.loyalty.dev/api/hotels/prices?destination_id=WD0M&checkin=2023-10-01&checkout=2023-10-07&lang=en_US&currency=SGD&country_code=SG&guests=2&partner_id=1" 
  );
  const hotels = data.json();
  const filteredhotels = hotels.sort(sortBySearchRank);

});

describe('sortBySearchRank, higher value will mean higher up in page ', () => {
  test('should sort in descending order when both hotels have searchRank and B is higher', () => {
    const hotelA = { searchRank: 0.95 };
    const hotelB = { searchRank: 2 };
    expect(sortBySearchRank(hotelA, hotelB)).toBe(1.05);
  });

  test('should sort in ascending order when both hotels have searchRank and B is lower', () => {
    const hotelA = { searchRank: 2 };
    const hotelB = { searchRank: 0.95 };
    expect(sortBySearchRank(hotelA, hotelB)).toBe(-1.05);
  });

  test('should move hotelA to the end when it has no searchRank', () => {
    const hotelA = {};
    const hotelB = { searchRank: 2 };
    expect(sortBySearchRank(hotelA, hotelB)).toBe(1);
  });

  test('should move hotelB to the end when it has no searchRank', () => {
    const hotelA = { searchRank: 2 };
    const hotelB = {};
    expect(sortBySearchRank(hotelA, hotelB)).toBe(-1);
  });

  test('should keep order unchanged when both hotels have no searchRank', () => {
    const hotelA = {};
    const hotelB = {};
    expect(sortBySearchRank(hotelA, hotelB)).toBe(0);
  });
});
