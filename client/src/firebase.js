// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  apiKey: "AIzaSyCbrQjj6Eko7sEOGcB7dXeilpazE_ujMuU",
  authDomain: "bhuvanar-cms.firebaseapp.com",
  projectId: "bhuvanar-cms",
  storageBucket: "bhuvanar-cms.appspot.com",
  messagingSenderId: "519314372074",
  appId: "1:519314372074:web:7c0524d0336665cff76e93",
  measurementId: "G-T0CZMZW7LP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
