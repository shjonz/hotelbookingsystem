import { createContext, useReducer } from "react";

const INITIAL_STATE = {
    destination : undefined,
    uid: undefined,
    dest_id: undefined,
    date: [],
    guests: undefined,
    lang : undefined,
    currency : undefined,
    partner_id : undefined,
    price : undefined,
    room : undefined,
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
    switch (action.type) {
      case "NEW_SEARCH":
        return action.payload;
      case "RESET_SEARCH":
        return INITIAL_STATE;
      case "UPDATE_UID":
        return { ...state, uid: action.payload };
      case "UPDATE_DEST_ID":
        return { ...state, dest_id: action.payload };
      case "UPDATE_DATE":
        return { ...state, date: action.payload };
      case "UPDATE_GUESTS":
        return { ...state, guests: action.payload };
      case "UPDATE_LANG":
        return { ...state, lang: action.payload };
      case "UPDATE_CURRENCY":
        return { ...state, currency: action.payload };
      case "UPDATE_PARTNER_ID":
        return { ...state, partner_id: action.payload };
      case "UPDATE_DESTINATION":
        return {...state, destination: action.payload};
      case "UPDATE_PRICE":
        return {...state, price: action.payload};
      case "UPDATE_ROOM":
        return {...state, room: action.payload};
      default:
        return state;
    }
  };

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        uid: state.uid,
        dest_id: state.dest_id,
        date: state.date,
        guests: state.guests,
        lang : state.lang,
        currency : state.currency,
        partner_id : state.partner_id,
        destination: state.destination,
        price : state.price,
        room: state.room,
        dispatch
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};