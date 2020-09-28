// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDfJzduQqywyrN-DCusmbXJFWRtOCL4cGw",
    authDomain: "insta-clone-59555.firebaseapp.com",
    databaseURL: "https://insta-clone-59555.firebaseio.com",
    projectId: "insta-clone-59555",
    storageBucket: "insta-clone-59555.appspot.com",
    messagingSenderId: "342042800783",
    appId: "1:342042800783:web:f6c3a8476b0a8a026e36fa",
    measurementId: "G-PTQGNWP8J9"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
export { db, auth, storage };

//export default db;