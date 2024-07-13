// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
// Required for side-effects
import "firebase/firestore";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import {getAuth , GoogleAuthProvider } from "firebase/auth";

import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyDp_dclLEtTxaaeW-lMfPX-t-nizzmHyJ0",
    authDomain: "chatapp-9198a.firebaseapp.com",
    projectId: "chatapp-9198a",
    storageBucket: "chatapp-9198a.appspot.com",
    messagingSenderId: "712113722583",
    appId: "1:712113722583:web:e77a8a4242d1106834cc92",
    measurementId: "G-0L0FBHJCQY"
  };


  const firebaseApp = initializeApp(firebaseConfig);

  const db = getFirestore(firebaseApp);
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  export {auth , provider};
  export default db;

  export const imageDb = getStorage(firebaseApp)


  // setRooms(querySnapshot.map(doc=>(
//         {
//             id:doc.id,
//             data:doc.data()
//         }
// )))


  // doc.data() is never undefined for query doc snapshots
//   console.log(doc.id, " => ", doc.data());
//   doc.data().map(room=>(
//     setRooms(room.name)
//   ))