import { createContext, useEffect, useState } from "react";
import data from '../countrycodeflagname.json';

export const SelectedOptionContext = createContext();

const defaultoption = {
  "label": "Singapore",
  "code": "SG",
  "capital": "Singapore",
  "region": "AS",
  "currency": {
    "code": "SGD",
    "name": "Singapore dollar",
    "symbol": "$"
  },
  "language": {
    "code": "en",
    "name": "English"
  },
  "flag": "https://restcountries.eu/data/sgp.svg"
}

export const SelectedOptionProvider = ({ children }) => {
  const [selectedOption, setSelectedOption] = useState(defaultoption);
  

  return (
    <SelectedOptionContext.Provider value={{ selectedOption, setSelectedOption }}>
      {children}
    </SelectedOptionContext.Provider>
  );
};