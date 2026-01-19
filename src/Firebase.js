import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

var firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCpfyZEC5C00MxWDjePjiik7PR3xIdjOhw",
  authDomain: "iprkaac-d132c.firebaseapp.com",
  projectId: "iprkaac-d132c",
  storageBucket: "iprkaac-d132c.appspot.com",
  messagingSenderId: "757157728688",
  appId: "1:757157728688:web:10a569d28bb0a336990675",
  measurementId: "G-85EJ30WL4V",
});

// Initialize Firebase
var db = firebaseApp.firestore();
export const auth = getAuth(firebaseApp);
export const database = getDatabase(firebaseApp);
export const storage = getStorage(firebaseApp);
export { db };
