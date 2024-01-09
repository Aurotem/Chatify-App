import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";


export const firebaseConfig = {
    apiKey: "AIzaSyD-Sb-nUYX1qp2L6FeXrplQuH4Mnrfzp5g",
    authDomain: "chatify-38f61.firebaseapp.com",
    databaseURL:
      "https://chatify-38f61-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "chatify-38f61",
    storageBucket: "chatify-38f61.appspot.com",
    messagingSenderId: "50438805825",
    appId: "1:50438805825:web:2b3c1e3ebda7d75eec69c0",
    measurementId: "G-PWRDB84GGK",
  };
  
  // Initialize Firebase
  export const app = initializeApp(firebaseConfig);
  export const analytics = getAnalytics(app);