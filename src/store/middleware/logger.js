export const loggerMiddleware = (store) => (next) => (action) => {
  if (!action.type) {
    // sometimes we get action that is not required (type less function  > redux thunk)
    return next(action);
  }
  console.log("type: ", action.type);
  console.log("payload: ", action.payload);
  console.log("currentState: ", store.getState()); // value of state  here we have action an dpreviour state
  next(action); // store will get us new state after this we see action hist reducers and updates (subsequent all middleware runs and all reducers run ) any code afetr next fires
  console.log("next state", store.getState()); // we get new state value  > what we pass in our middleware
};
