import { useEffect } from "react";
import { useDispatch } from "react-redux";
// import {
//   createUserDocumentFromAuth,
//   onAuthStateChangedListener,
//   getCurrentUser,
// } from "./utils/firebase/firebase.utils";
import Home from "./routes/home/home.component";
import { Routes, Route } from "react-router-dom";
import Navgiation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
// import { setCurrentUser } from "./store/user/user.action";
import { checkUserSession } from "./store/user/user.action";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkUserSession); // Triggering checkUserSession

    /// ONE WITH signle check user//////////
    /* getCurrentUser().then((user) => console.log(user)); // here we used single check generator fron firebase utils  */
    /////////////////////

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // const unsubscribe = onAuthStateChangedListener((user) => {
    //   if (user) {
    //     createUserDocumentFromAuth(user);
    //   }
    //   dispatch(setCurrentUser(user)); // dipatches acton to root reducer , hwoch inturn passes action to every reduecer function
    // });
    // return unsubscribe;
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  }, []); // here if you don't wnat to use dispatch you can , but its jsut o remove warning here as we know in reduce there will only be one dispatch ever.

  // you need to tell component to stop listening once component unmounts , else we have a memory leak
  // , above we get afunction unsubscribe that helps use in unsubscribing same

  return (
    <Routes>
      <Route path="/" element={<Navgiation />}>
        <Route index element={<Home />} />
        <Route path="shop/*" element={<Shop />} />
        <Route path="auth" element={<Authentication />} />
        <Route path="checkout" element={<Checkout />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
