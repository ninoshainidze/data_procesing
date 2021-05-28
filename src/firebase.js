
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB-kdmJd_loBPg8vrb91YBUv93BrDyIx_c",
  authDomain: "copart-log.firebaseapp.com",
  projectId: "copart-log",
  storageBucket: "copart-log.appspot.com",
  messagingSenderId: "716511677113",
  appId: "1:716511677113:web:f5e4c7c9230d808310a968"
});



const db = firebaseApp.firestore();

export default db;