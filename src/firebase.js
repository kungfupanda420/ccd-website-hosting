// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcQC2G9g6ezz4wbfwW8dLommcTdto143E",
  authDomain: "summerintern-4b0e2.firebaseapp.com",
  projectId: "summerintern-4b0e2",
  storageBucket: "summerintern-4b0e2.firebasestorage.app",
  messagingSenderId: "427506367038",
  appId: "1:427506367038:web:5894922db95b2a5485af6f",
  measurementId: "G-S3QNNKLB63"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);