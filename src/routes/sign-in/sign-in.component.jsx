// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils.js";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component.jsx";

const SignIn = () => {
  // useEffect(() => {
  //   (async () => {
  //     const response = await getRedirectResult(auth);
  //     if (response) {
  //       const userDocRef = await createUserDocumentFromAuth(response.user);
  //     }
  //   })();
  // }, []);
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user); // simply cehcing if any existing doc refernec is there on firebase
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
