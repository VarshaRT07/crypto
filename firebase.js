import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCHNh2_AiXgQ9swqyJY_MKtKrbe3WzS7Q",
  authDomain: "crypto-9c78d.firebaseapp.com",
  projectId: "crypto-9c78d",
  storageBucket: "crypto-9c78d.appspot.com",
  messagingSenderId: "1012256565811",
  appId: "1:1012256565811:web:0de4ac6d296e5be374d146",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const auth = getAuth();

export { app, db, storage, auth };
