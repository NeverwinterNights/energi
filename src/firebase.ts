import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAmLNd6gF8vEDMGKFRhyZBaVBVgvFq3Qz0",
  authDomain: "advert-8c7be.firebaseapp.com",
  projectId: "advert-8c7be",
  storageBucket: "advert-8c7be.appspot.com",
  messagingSenderId: "273535972871",
  appId: "1:273535972871:web:4b5fcb32a0b84d414a1ca2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
//
// // Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyAmLNd6gF8vEDMGKFRhyZBaVBVgvFq3Qz0",
//     authDomain: "advert-8c7be.firebaseapp.com",
//     projectId: "advert-8c7be",
//     storageBucket: "advert-8c7be.appspot.com",
//     messagingSenderId: "273535972871",
//     appId: "1:273535972871:web:4b5fcb32a0b84d414a1ca2"
// };
//
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
