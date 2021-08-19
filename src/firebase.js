import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDt_7pRkjODbDuePRM4n2UAiZm_84aX8rE",
  authDomain: "ecommerce-frontend-ce1df.firebaseapp.com",
  projectId: "ecommerce-frontend-ce1df",
  storageBucket: "ecommerce-frontend-ce1df.appspot.com",
  messagingSenderId: "496487041793",
  appId: "1:496487041793:web:4c849f6d75b572eae32900",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//export

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
