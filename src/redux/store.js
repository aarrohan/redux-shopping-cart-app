// Dependencies
import { combineReducers, createStore } from "redux";

// Reducers
import cartReducer from "./cart/reducer";

// Root Reducer
const rootReducer = combineReducers({
  cart: cartReducer,
});

// Store
const store = createStore(rootReducer);

// Export
export default store;
