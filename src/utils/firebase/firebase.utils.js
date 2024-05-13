import { rejects } from "assert";
import { initializeApp } from "firebase/app"; // SDK for APP on firebase
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth"; // Authentication

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore"; // getting firebase dB
import { resolve } from "path";

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

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey); // looking in a collection for a collection key that don't exist will simply make firbase to create one
  // to show successfull trnasction of increase in no. of docs in collecctionef
  // use batch to add all ouyr documents to collection in one succesfull transaction
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object); // firebasevwith point us to lcoation for Objecttitel in collectionRef even if doesn't exist
  });

  await batch.commit();
  console.log("done");
};

// extracting products and categories form firestore DB
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef); // object we get from query method

  const querySnapshot = await getDocs(q); // asyn ability to fetch documnet snapshot
  return querySnapshot.docs.map((docSnaphot) => docSnaphot.data());
};

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

//CTA 1
export const CreateUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

//CTA 2
export const SignInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

// SIGN OUT METHOD
// takes auth sigleton to tell signout which user to logout

export const signOutUser = () => {
  signOut(auth);
};

// Centralising our code for user context and using onAuthStateChnaged(auth,callback)

// here we direct give parameter callback menas whenever we insatntiate this fucntion, you hav eto give me acllback

// on onAuthStateChnagedListner receives some kind of callbackfunction it passses this callback function as second value of onAuthstatechanged . it calls callback when Authentication state of AUth chnages. use signs in auth change asuser authenticated

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback);
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (userAuth) => {
        unsubscribe();
        resolve(userAuth);
      },
      reject
    );
  });
};
