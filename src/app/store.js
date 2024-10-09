import { configureStore } from "@reduxjs/toolkit";
import transactionsReducer from '../features/transactions/transactionsSlice'; // Import the reducer from transactionsSlice

// Configure the store to use the transactions reducer
const store = configureStore({
  reducer: {
    transactions: transactionsReducer, // Add the transactions slice reducer here
  },
});

export default store;
