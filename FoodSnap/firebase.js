// firebase.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {

    apiKey: "AIzaSyB0pqfGCdPv-9SipZqwRhp2HxuozNx_1Uc",
  
    authDomain: "food-snap-d6893.firebaseapp.com",
  
    databaseURL: "https://food-snap-d6893-default-rtdb.firebaseio.com",
  
    projectId: "food-snap-d6893",
  
    storageBucket: "food-snap-d6893.appspot.com",
  
    messagingSenderId: "225147574691",
  
    appId: "1:225147574691:web:e7c0d80d0728c6b0e72216",
  
    measurementId: "G-DZJ99NXY9D"
  
  };
  
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
