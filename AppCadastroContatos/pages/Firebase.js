import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
  apiKey: "AIzaSyCvnSl9n2vZ1gtJcHY9hKYhO-xQ1chA7EU",
  authDomain: "cadcontatosapp.firebaseapp.com",
  projectId: "cadcontatosapp",
  storageBucket: "cadcontatosapp.firebasestorage.app",
  messagingSenderId: "736077286796",
  appId: "1:736077286796:web:e94100beac9016402b1aa9",
  measurementId: "G-PL9P5FE69F"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };