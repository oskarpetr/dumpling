import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCcnHxeXpIr4Yf4ayfe62Rj2rqxk-GwX08",
  authDomain: "dumpling-oskarpetr.firebaseapp.com",
  projectId: "dumpling-oskarpetr",
  storageBucket: "dumpling-oskarpetr.appspot.com",
  messagingSenderId: "287184355074",
  appId: "1:287184355074:web:ffa16326bafce092ca0c1b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
