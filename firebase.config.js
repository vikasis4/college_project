// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAg5kteesPsGyCdjOIRLu8m0vYBw8ebpBY",
    authDomain: "nitkkr-470e5.firebaseapp.com",
    projectId: "nitkkr-470e5",
    storageBucket: "nitkkr-470e5.appspot.com",
    messagingSenderId: "638013161640",
    appId: "1:638013161640:web:540c7e0e7603ac3b7bc29d",
    measurementId: "G-BTSXMYJ4ET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const storage = getStorage()