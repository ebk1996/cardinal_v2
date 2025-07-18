// Import the functions you need from the SDKs you need
//import { initializeApp } from "firebase/app";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPCE1GEMJ4okJUsJ3Yqy3mXNOvlC3wjVU",
  authDomain: "zdfg-6bbb5.firebaseapp.com",
  databaseURL: "https://zdfg-6bbb5-default-rtdb.firebaseio.com",
  projectId: "zdfg-6bbb5",
  storageBucket: "zdfg-6bbb5.firebasestorage.app",
  messagingSenderId: "904688236182",
  appId: "1:904688236182:web:d0cb12be145ec9fbab34b7",
  measurementId: "G-65SRRX1NRS"
};
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { app, storage };
export default db;
