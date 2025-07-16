// lib/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDslLIGkxyF3fHofNmcq-GoJwhzXEBvKvA',
  authDomain: 'go-celpip-test.firebaseapp.com',
  projectId: 'go-celpip-test',
  storageBucket: 'go-celpip-test.firebasestorage.app', // ✅ FIXED here
  messagingSenderId: '248728591994',
  appId: '1:248728591994:web:42a83ca2fa621d9f9b25c3',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app); // 👈 Ensure this is exported too





