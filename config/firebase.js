import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDBb9pAISZ81QSxQh42bdwLH8tgST4nO3A",
  authDomain: "my-cats-app.firebaseapp.com",
  projectId: "my-cats-app",
  storageBucket: "my-cats-app.appspot.com",
  messagingSenderId: "542648104565",
  appId: "1:542648104565:web:8a852efebb85e540d7aa3c",
};

const app = initializeApp(firebaseConfig);

const firebase = getFirestore(app);

export default firebase;
