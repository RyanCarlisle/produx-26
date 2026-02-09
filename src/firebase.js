import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
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
      provider: new ReCaptchaV3Provider(import.meta.env.VITE_RECAPTCHA_SITE_KEY),
      isTokenAutoRefreshEnabled: true
    });
    console.log("App Check initialized");
  } catch (e) {
    console.error("App Check failed to initialize:", e);
  }
}
