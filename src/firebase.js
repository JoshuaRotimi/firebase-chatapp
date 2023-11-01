import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzOBsx0Bv9NVzMzgOaeJ0-J4FUiNK4DcA",
  authDomain: "devchat-app-d5ce9.firebaseapp.com",
  projectId: "devchat-app-d5ce9",
  storageBucket: "devchat-app-d5ce9.appspot.com",
  messagingSenderId: "1061318171761",
  appId: "1:1061318171761:web:8bf7d5e684714aac1a0fd0",
  measurementId: "G-MBXL88ERZS",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
