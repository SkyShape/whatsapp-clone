import firebase from "firebase";
// import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyABSrCGL9Hma3gkb6uTAVummsCFUwRQIhA",
    authDomain: "watsapp-clone-vh.firebaseapp.com",
    projectId: "watsapp-clone-vh",
    storageBucket: "watsapp-clone-vh.appspot.com",
    messagingSenderId: "111240772586",
    appId: "1:111240772586:web:b00556e0e40eac412b1093",
    measurementId: "G-R59PGEHFKB"
  };
 

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth =firebase.auth();
  const provider =new firebase.auth.GoogleAuthProvider();

  const db = firebaseApp.firestore();


  export default db;
  export {auth, provider};
