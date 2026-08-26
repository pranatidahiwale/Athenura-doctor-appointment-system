// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCPC0UBEf_999JMWvWGlZrod4brZ4JLzMk",
  authDomain: "clinic-5dbbc.firebaseapp.com",
  projectId: "clinic-5dbbc",
  storageBucket: "clinic-5dbbc.firebasestorage.app",
  messagingSenderId: "213941065932",
  appId: "1:213941065932:web:9ad82a5eddd80868eb8a69",
  measurementId: "G-E1VWRCVPYV"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();