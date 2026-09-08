// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuZub3ayHQ9EA-mXmPPeGiIa47hCUrlRM",
  authDomain: "keiko-app-da5c5.firebaseapp.com",
  projectId: "keiko-app-da5c5",
  storageBucket: "keiko-app-da5c5.firebasestorage.app",
  messagingSenderId: "545239509693",
  appId: "1:545239509693:web:3d0dfd019bd17c0f3ca5d4",
  measurementId: "G-FXC348S28N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);