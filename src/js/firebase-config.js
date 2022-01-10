
// import firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO create vars in constants file or even better in env variables.

export const firebaseConfig = {
  apiKey: "AIzaSyAEXCYIiI4NYdR3jBy9J-40def4xRON_T8",
  authDomain: "oauth-fa471.firebaseapp.com",
  projectId: "oauth-fa471",
  storageBucket: "oauth-fa471.appspot.com",
  messagingSenderId: "509264514503",
  appId: "1:509264514503:web:ea425c2dc96f80c136dde2",
  measurementId: "G-QWLZKB7G5Q",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
//
export const provider = new GoogleAuthProvider();
