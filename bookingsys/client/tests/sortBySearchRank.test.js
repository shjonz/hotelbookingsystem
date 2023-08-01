import { sortBySearchRank } from '../src/views/hotelsList/HotelsList.js';

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
