import { initializeApp } from "firebase/app";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  getAuth,
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlg0yeBsb0H2AEOw4gJE_qL7ESHhdAHTc",
  authDomain: "agenday-c40f4.firebaseapp.com",
  projectId: "agenday-c40f4",
  storageBucket: "agenday-c40f4.appspot.com",
  messagingSenderId: "418465535007",
  appId: "1:418465535007:web:efebe2d1bbce52c5df712a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const providerGoogle = new GoogleAuthProvider();
export const providerFacebook = new FacebookAuthProvider();
export default app;
