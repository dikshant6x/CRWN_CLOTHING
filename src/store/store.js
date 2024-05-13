import { compose, createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // import local storage from borwser
import { rootSaga } from "./root-saga";

// import { thunk } from "redux-thunk";

import createSagaMiddleware from "redux-saga";

// library helper that run before and catcher action hits the reducer and log theier state
// you dispatch an action it hits middleware first then reducer

// chained carry function middleware function

// const loggerMiddleware = (store) => (next) => (action) => {
//   if (!action.type) {
//     // sometimes we get action that is not required (type less function  > redux thunk)
//     return next(action);
//   }
//   console.log("type: ", action.type);
//   console.log("payload: ", action.payload);
//   console.log("currentState: ", store.getState()); // value of state  here we have action an dpreviour state
//   next(action); // store will get us new state after this we see action hist reducers and updates (subsequent all middleware runs and all reducers run ) any code afetr next fires
//   console.log("next state", store.getState()); // we get new state value  > what we pass in our middleware
// };

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"], // don't want to store in local storge as user data come from AUTH state listner
};

const SagaMiddleware = createSagaMiddleware();

const presistedReducer = persistReducer(persistConfig, rootReducer);

const middlewares = [
  process.env.NODE_ENV !== "production" && logger,
  SagaMiddleware, // we earleir added thunk here for redux thunk
].filter(Boolean); // alwyas make sure you never use logger on prod code as it will log all to user console  use only in dev mode
// here we use .filter(Boolean) as it helps us incase we haev a false value updates it to empty array and on True it gives expeted object

const composeEnhancer =
  (process.env.NODE_ENV !== "production" &&
    window &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// enhancer ex we basically club all middler walre and spread them here
const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(
  presistedReducer,
  undefined,
  composedEnhancers
);

SagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);
