// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqSuwR_1mGEHOVpUzPhlhYxIulheov1Hs",
  authDomain: "meso-2de20.firebaseapp.com",
  projectId: "meso-2de20",
  storageBucket: "meso-2de20.firebasestorage.app",
  messagingSenderId: "256089542613",
  appId: "1:256089542613:web:3891f021bd7b05b3abb75c",
  measurementId: "G-F800XXYBH1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
