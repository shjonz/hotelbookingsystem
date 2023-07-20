import { createContext, useReducer } from "react"

const INITIAL_STATE = {
    uid : undefined,
    dest_id : undefined,
    dates : [],
    options : {
        adult : undefined,
        child : undefined,
        room: undefined
    },
    lang : undefined,
    currency : undefined,
    partner_id : undefined,
};

export const SearchContext = createContext(INITIAL_STATE)

const SearchReducer = (state, action) => {
    switch(action.type){
        case "NEW_SEARCH" :
            return action.payload

        case "RESET_SEARCH" :
            return INITIAL_STATE

        default :
            return state;
    }
};

export const SearchContextProvider = ({children}) => {
    const [state,dispatch] = useReducer(SearchReducer, INITIAL_STATE)

    return(
        <SearchContext.Provider
        value = {{
            uid : state.uid,
            dest_id: state.dest_id,
            dates: state.dates, 
            options: state.options,
            lang: state.lang,
            currency: state.currency,
            partner_id: state.partner_id,
            dispatch}}
            >
                {children}
            </SearchContext.Provider>
    );
}
