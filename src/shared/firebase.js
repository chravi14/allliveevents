import firebase from 'firebase';

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//     projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//     storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//     messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//     appId: process.env.REACT_APP_FIREBASE_APP_ID,
//     // measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
// };


const firebaseConfig = {
    apiKey: "AIzaSyC8vWdR_4Q6c3fzsVxTs2nWm67IKkJkZlU",
    authDomain: "all-abilities-live.firebaseapp.com",
    projectId: "all-abilities-live",
    storageBucket: "all-abilities-live.appspot.com",
    messagingSenderId: "945392424670",
    appId: "1:945392424670:web:e27cf79f142bbcf363144f"
}

const myApp = firebase.initializeApp(firebaseConfig);

export const auth = myApp.auth();