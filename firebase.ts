// Import the functions you need from the SDKs you need
import { initializeApp,getApp , getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD7Dez0MfkXWSfNsLmI5n14UFNQDAzLNfM",
  authDomain: "cherry-blog-91fdc.firebaseapp.com",
  projectId: "cherry-blog-91fdc",
  storageBucket: "cherry-blog-91fdc.appspot.com",
  messagingSenderId: "125723686192",
  appId: "1:125723686192:web:d73b70d75a43c0f76844f5",
  measurementId: "G-PETK3YB3VZ"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig):getApp();
const db = getFirestore()
const storage = getStorage()
// const analytics = getAnalytics(app);

export default app
export {
  db , storage
}
