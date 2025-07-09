// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; 

const firebaseConfig = {
  apiKey: "AIzaSyCZ2qqAZ0GnaYwl2RZJpEEJHXf8sC6tgYc",
  authDomain: "car-bike-rentals.firebaseapp.com",
  projectId: "car-bike-rentals",
  storageBucket: "car-bike-rentals.appspot.com",
  messagingSenderId: "99188020305",
  appId: "1:99188020305:web:1df46da57e5608a3cd5470",
  measurementId: "G-L9T15FWK5D",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app); 


export { db, auth };


