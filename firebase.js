// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCRWTWfK3s2u0rRY8nfa5naddyBJVQq930",
  authDomain: "flashcardsaas-732a0.firebaseapp.com",
  projectId: "flashcardsaas-732a0",
  storageBucket: "flashcardsaas-732a0.appspot.com",
  messagingSenderId: "1021378285665",
  appId: "1:1021378285665:web:6ac65df2acb8762cf59a20",
  measurementId: "G-WF899YXCQG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {db}