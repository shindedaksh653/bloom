// src/firebase.ts
import { initializeApp } from "firebase/app";
import { 
  initializeFirestore, 
  persistentLocalCache, 
  persistentMultipleTabManager 
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAzr8HCEL3ecYWLWe2Jc3rMC51ClqV2bYM",
  authDomain: "bloom-app-e945c.firebaseapp.com",
  projectId: "bloom-app-e945c",
  storageBucket: "bloom-app-e945c.firebasestorage.app",
  messagingSenderId: "490610951003",
  appId: "1:490610951003:web:e604fdd36457f44cb3107e"
};

const app = initializeApp(firebaseConfig);

// Initialize Firestore with offline persistence enabled
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({
    tabManager: persistentMultipleTabManager()
  })
});