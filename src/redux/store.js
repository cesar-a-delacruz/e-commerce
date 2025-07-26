import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// Reducers
import { cartReducer } from "./reducers/cartReducer";
import { productsReducer, productReducer } from "./reducers/productReducers";
import { userReducer } from "./reducers/userReducer";

const reducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  product: productReducer,
  user: userReducer,
});

const middleware = [thunk];
const INITIAL_STATE = {};
const store = createStore(
  reducer,
  INITIAL_STATE,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
