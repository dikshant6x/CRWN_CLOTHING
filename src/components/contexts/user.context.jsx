import { createContext, useEffect, useReducer } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../../utils/firebase/firebase.utils";
import { createAction } from "../../utils/reducer/reducer.utils";

// export out context as userContext
// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
});
// Here we pass value to createContext object with values null and Setter function wth null o/p
// Passing in default value in create context when initially creating it
// Current value of state

// ADDING REDUCER
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

const userReducer = (state, action) => {
  console.log("dispatched");
  console.log(action);
  const { type, payload } = action;

  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const INITIAL_STATE = {
  currentUser: null,
};

export const UserProvider = ({ children }) => {
  // const [currentUser, setCurrentUser] = useState(null); // currentUser = value of useState ; setCurrentUser = setter function of useState
  const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE); // utilizing usereducer hook we have 2 inpit attr usereducer= reducerfuction ; INITIAL STATE = initial value for state  ;  what we are extracting is State Object and dispatch function
  // const { currentUser } = state; you cna see above we added it direct ly as {currentUser} rather than
  console.log(currentUser);

  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user)); // here these are attr of action obj that goes to userReducer and update our o/p
  };
  const value = { currentUser, setCurrentUser };

  // Here we consolidtae our whole codefor listner callback to listen forany auth stet change that now is place under user context
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  // you need to tell component to stop listening once component unmounts , else we have a memory leak
  // , above we get afunction unsubscribe that helps use in unsubscribing same
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// 1. userContext.Provider here Provier is a component that wraps the componnets (all the component) that need access to the values in context
// 2. Provider also intakes values that will help it set values further on successfull registery o login
// 3. userProvider allow wrapped children components to access any of values inside its useState
// 4. be able to call Setter function and get Value anywhere inside of components tree nested within actual provider value
// null value passed is for state not for context ; as context needs empty value as well so we are using empty state of a nobject
