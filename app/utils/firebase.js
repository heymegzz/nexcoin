
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqjVuZjuNtj-HnxulhvPb8C2Uz7M5WhOs",
  authDomain: "nexcoin-c935d.firebaseapp.com",
  projectId: "nexcoin-c935d",
  storageBucket: "nexcoin-c935d.firebasestorage.app",
  messagingSenderId: "806536544827",
  appId: "1:806536544827:web:1476cd9ed607c1dc0d121e",
};


let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);