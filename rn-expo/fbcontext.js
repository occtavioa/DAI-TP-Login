// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1ZXUqt5WtJm_cHI0A6YushoJA5dEUE68",
  authDomain: "dai-tp-login.firebaseapp.com",
  projectId: "dai-tp-login",
  storageBucket: "dai-tp-login.appspot.com",
  messagingSenderId: "981607566922",
  appId: "1:981607566922:web:23cc04085811e6c2cd60b3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app)
export const db = getFirestore(app)
