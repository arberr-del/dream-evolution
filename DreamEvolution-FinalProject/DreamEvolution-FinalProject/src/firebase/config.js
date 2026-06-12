import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// 🔧 Replace with your Firebase project config
// Firebase Console → Project Settings → Your Apps → SDK setup
const firebaseConfig = {
  apiKey: "AIzaSyD6DEiNdYwjb79RNAFv91wggfM6OuvWozY",
  authDomain: "dreamevolution-finalproject.firebaseapp.com",
  projectId: "dreamevolution-finalproject",
  storageBucket: "dreamevolution-finalproject.firebasestorage.app",
  messagingSenderId: "646331668407",
  appId: "1:646331668407:web:bb47e0ab1756757259ba32",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// 🔧 Change this to the email that should have admin access
export const ADMIN_EMAIL = "arber.r030609@gmail.com";
