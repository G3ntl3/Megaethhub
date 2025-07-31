import { initializeApp } from "firebase/app";
import { getAuth, TwitterAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwQWfj8AvSvM8-FnGCuDaPwi0fbVIaIaE",
  authDomain: "megaethweb3.firebaseapp.com",
  projectId: "megaethweb3",
  storageBucket: "megaethweb3.firebasestorage.app",
  messagingSenderId: "27625704443",
  appId: "1:27625704443:web:e94f4d74d1c5184927995e",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new TwitterAuthProvider();

export { auth, provider };
