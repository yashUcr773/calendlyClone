// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
//     authDomain: "calendly-9f11f.firebaseapp.com",
//     projectId: "calendly-9f11f",
//     storageBucket: "calendly-9f11f.appspot.com",
//     messagingSenderId: "302206780408",
//     appId: "1:302206780408:web:4ccee4e5ecc519aa670c0d",
//     measurementId: "G-M4C9RZE9SE"
// };

const firebaseConfig = {
    apiKey: "process.env.NEXT_PUBLIC_FIREBASE_KEY",
    authDomain: "calendly-2-test.firebaseapp.com",
    projectId: "calendly-2-test",
    storageBucket: "calendly-2-test.appspot.com",
    messagingSenderId: "723837629900",
    appId: "1:723837629900:web:da915607e9960e9ed59969",
    measurementId: "G-SRG3TKLR42"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);