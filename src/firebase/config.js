import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyADuzD68Z3ay4I_Izjx4aA9Gu8-hlf2dfw",
    authDomain: "managerrr-30a16.firebaseapp.com",
    projectId: "managerrr-30a16",
    storageBucket: "managerrr-30a16.appspot.com",
    messagingSenderId: "349737545058",
    appId: "1:349737545058:web:468d89d97d4b87c73ad03b"
  };


// Initialize App
firebase.initializeApp(firebaseConfig);

// Firestore service
const db = firebase.firestore();

//Authentication service

const auth = firebase.auth();

// Storage Service
const storage = firebase.storage();

// Timestamp
const timestamp = firebase.firestore.Timestamp;

//Export the needed stuff
export {db, auth, storage, timestamp};