const firebase = require("firebase/app");
const doc = require("firebase/firestore")
const storage = require("firebase/storage");

// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrjJnz15tCvZSiUcqHtG6VetMYXbePyFI",
  authDomain: "helpfood-29ce0.firebaseapp.com",
  projectId: "helpfood-29ce0",
  storageBucket: "helpfood-29ce0.appspot.com",
  messagingSenderId: "561309052030",
  appId: "1:561309052030:web:de8b1a8b587300b61cfc2f",
  measurementId: "G-Y5SW3SNE08"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
module.exports = { firebase, firebaseConfig, doc, storage };