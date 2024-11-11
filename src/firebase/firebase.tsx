import { initializeApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBFAdHpBqnCjFYEwO-P3Qh7EMplFMJVyio",
  authDomain: "alphabook-98626.firebaseapp.com",
  projectId: "alphabook-98626",
  storageBucket: "alphabook-98626.firebasestorage.app",
  messagingSenderId: "905888099127",
  appId: "1:905888099127:web:94b027bc69f0f5d51488b2"
};

const app = initializeApp(firebaseConfig);

export const auth: Auth = getAuth(app);
export const db: Firestore = getFirestore(app);

export default app;
