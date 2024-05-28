import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCo8rFqBkt8iO8DI6eSIbySd90npbS_s5U",
  authDomain: "video-f6c51.firebaseapp.com",
  projectId: "video-f6c51",
  storageBucket: "video-f6c51.appspot.com",
  messagingSenderId: "879040064720",
  appId: "1:879040064720:web:ed1e295e894308a9e202d5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();

export default app;
