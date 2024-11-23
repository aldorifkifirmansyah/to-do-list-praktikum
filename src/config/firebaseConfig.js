import { initializeApp } from "@react-native-firebase/app";
import { getFirestore } from "@react-native-firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_rX-uWtuNQeUd1_pF-SbQLRJRDCTS8LY",
  authDomain: "to-do-list-new-e7397.firebaseapp.com",
  projectId: "to-do-list-new-e7397",
  storageBucket: "to-do-list-new-e7397.firebasestorage.app",
  messagingSenderId: "460091957084",
  appId: "1:460091957084:web:9a82a132f515b12855ab99",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
