import { createContext, useState, useEffect } from "react";
import {
  createUserDocumentFromAuth,
  onAuthStateChangedListener,
} from "../../utils/firebase/firebase.utils";

// export out context as userContext
// as the actual value you want to access
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null,
}); // Here we pass value to createContext object with values null and Setter function wth null op/
// Passing in default value in create context when initially creating it
// Current value of state

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null); // currentUser = value of useState ; setCurrentUser = setter function of useState
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
