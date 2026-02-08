import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyA8seIxw0IQAjBsIEqYK_9sMwBiNa_-IGw",
  authDomain: "produx-26.firebaseapp.com",
  databaseURL: "https://produx-26-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "produx-26",
  storageBucket: "produx-26.firebasestorage.app",
  messagingSenderId: "213335095862",
  appId: "1:213335095862:web:ad026852d73dfbbe1bb697",
  measurementId: "G-FSMXZMW2KN"
};

// Singleton pattern to prevent crashes on hot-reload
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Realtime Database and export it
export const db = getDatabase(app);

// Initialize App Check
if (typeof window !== "undefined") {
  // eslint-disable-next-line no-unused-vars
  // Set debug token for localhost development
  if (location.hostname === "localhost") {
     // Use window instead of self to be safe
     window.FIREBASE_APPCHECK_DEBUG_TOKEN = true; 
  }

  try {
    const appCheck = initializeAppCheck(app, {
      provider: new ReCaptchaV3Provider('6LcGnWQsAAAAAJZ5UVLnQGUfBsGjT8_5lJAV8PrS'),
      isTokenAutoRefreshEnabled: true
    });
    console.log("App Check initialized");
  } catch (e) {
    console.error("App Check failed to initialize:", e);
  }
}
