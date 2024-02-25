import React, {createContext, useContext, useReducer} from 'react';

// Define initial state
const initialState = {
  bookedFlights: {},
};

// Define reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case 'BOOKED_FLIGHTS':
      return {...state, bookedFlights: action.payload};

    default:
      return state;
  }
};

// Create context for the Redux store
const StoreContext = createContext();

// Custom hook to access the Redux store
export const useStore = () => useContext(StoreContext);

// Provider component to wrap your app with the Redux store
export const StoreProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const store = {state, dispatch};

  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};
