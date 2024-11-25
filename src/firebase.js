// Import the necessary functions from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBxvGKOo4Ypg2wK96nALQsNWgqm_4suD8E",
  authDomain: "chat-app-f4213.firebaseapp.com",
  projectId: "chat-app-f4213",
  storageBucket: "chat-app-f4213.firebasestorage.app",
  messagingSenderId: "1057311985129",
  appId: "1:1057311985129:web:fb804cbfa17e90627d4f78",
  measurementId: "G-12J981NLER",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get the Firebase services you need
const auth = getAuth(app);  // Firebase Authentication
const db = getFirestore(app);  // Firebase Firestore
const analytics = getAnalytics(app);  // Firebase Analytics (optional)

// Export the initialized services to be used in your app
export { auth, db, analytics };
