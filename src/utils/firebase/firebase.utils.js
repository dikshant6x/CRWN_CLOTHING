import { initializeApp } from "firebase/app"; // SDK for APP on firebase
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth"; // Authentication

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"; // getting firebase dB

const firebaseConfig = {
  apiKey: "AIzaSyAT0dIduSLSUcmdEMlo3_LfuIfh7fEW9ng",
  authDomain: "crown-clothing-db-1c24c.firebaseapp.com",
  projectId: "crown-clothing-db-1c24c",
  storageBucket: "crown-clothing-db-1c24c.appspot.com",
  messagingSenderId: "628942664134",
  appId: "1:628942664134:web:908a6ac8ce506a28ec82c7",
  measurementId: "G-K6NRPJ7XVL",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider(); // Google Authprovider is class we get from firebase authentication thats why we use new against it, as we may need multipl diferent providers github,  google fcaebook etc
// Whenever someone interacts with our provider like google here will need to select an account to procced
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth(); // need to create the instance it's only needed once for whole website
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, provider);
export const db = getFirestore(); // This directly points to database

// we input access token we get from signin.component.jsx here in this method to access creation of Documents
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  //if user data does not exist
  // create /set the document with the data from userauth in my collection
  // if user data exists
  // return userDocRef
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth; // destructuring name and email
    const createdAt = new Date();
    // here we use setDoc to create a doc and save our destructured infor. form userAuth
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation, // Spread this object in last it works a s backup incase we dont get dispalyname we hardcode it
      }); // pass userdoc ref that we just got above using doc
    } catch (error) {
      console.log("Error creating the user", error.message);
    }
  }
  return userDocRef;
};

export const CreateUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};
