// firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmJVvya30Ez3OLHzPEBV4XFzDiq2eW7gY",
  authDomain: "hey-tate.firebaseapp.com",
  projectId: "hey-tate",
  storageBucket: "hey-tate.firebasestorage.app",
  messagingSenderId: "286854289367",
  appId: "1:286854289367:web:103c43dc82f812e7da1d92",
  measurementId: "G-JHNRMBJ9FB",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
