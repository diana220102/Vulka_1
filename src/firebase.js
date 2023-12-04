import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDPDfD-6hIZ9NfSxo6DQHZFZ-AZVqHeuAo",
  authDomain: "vulka-1beee.firebaseapp.com",
  projectId: "vulka-1beee",
  storageBucket: "vulka-1beee.appspot.com",
  messagingSenderId: "114632473087",
  appId: "1:114632473087:web:a747ef9d3489035f104fca",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
