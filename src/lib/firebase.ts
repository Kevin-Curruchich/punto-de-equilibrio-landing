import {
  getAnalytics,
  isSupported,
  logEvent,
  type Analytics,
} from "firebase/analytics";
import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const hasFirebaseConfig = Object.values(firebaseConfig).every(Boolean);

const analyticsPromise: Promise<Analytics | null> = !hasFirebaseConfig
  ? (console.warn(
      "Firebase Analytics no se inicializo: faltan variables VITE_FIREBASE_*.",
    ),
    Promise.resolve(null))
  : isSupported().then((supported) => {
      if (!supported) {
        console.warn(
          "Firebase Analytics no esta soportado en este navegador o contexto.",
        );
        return null;
      }

      const app =
        getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
      return getAnalytics(app);
    });

export async function trackEvent(
  eventName: string,
  eventParams?: Record<string, string | number | boolean>,
) {
  const analytics = await analyticsPromise;
  if (!analytics) return;

  logEvent(analytics, eventName, {
    ...eventParams,
    ...(import.meta.env.DEV ? { debug_mode: true } : {}),
  });
}
