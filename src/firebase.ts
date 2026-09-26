import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAwhnwrcE0ccUfratk_IbPJdt372Ew8fng",
  authDomain: "my-portfolio-3e3e6.firebaseapp.com",
  projectId: "my-portfolio-3e3e6",
  storageBucket: "my-portfolio-3e3e6.firebasestorage.app",
  messagingSenderId: "35574851115",
  appId: "1:35574851115:web:64347dd18156a08d806c6e",
  measurementId: "G-2SLE2D582L"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
// export const analytics = getAnalytics(app); // Only runs in browser environment
