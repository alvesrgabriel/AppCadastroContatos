import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDD0Qgxjl9ZHosjdu8jQB4IlJeSaXOWDTY",
  authDomain: "appcadastrocontatos.firebaseapp.com",
  projectId: "appcadastrocontatos",
  storageBucket: "appcadastrocontatos.firebasestorage.app",
  messagingSenderId: "527048045502",
  appId: "1:527048045502:web:cac1b4eca683e4fd3bffef"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
