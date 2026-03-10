import { initializeApp, getApps } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, Analytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBapJm8MbyRMM5qvETU4_NAeGX2PTFtbws",
    authDomain: "island-9bdb4.firebaseapp.com",
    projectId: "island-9bdb4",
    storageBucket: "island-9bdb4.firebasestorage.app",
    messagingSenderId: "818377038400",
    appId: "1:818377038400:web:790c73d8a988aa1c395da5",
    measurementId: "G-PTJZDH4E88",
};

// Prevent re-initialization in dev (hot reload)
const app =
    getApps().length === 0
        ? initializeApp(firebaseConfig)
        : getApps()[0];

// Firestore works on both server and client
export const db = getFirestore(app);

// Auth and Analytics are client-only — lazy init to avoid SSR errors
let _auth: Auth | null = null;
let _analytics: Analytics | null = null;

export function getClientAuth(): Auth {
    if (!_auth) {
        _auth = getAuth(app);
    }
    return _auth;
}

export function getClientAnalytics(): Analytics | null {
    if (typeof window === "undefined") return null;
    if (!_analytics) {
        _analytics = getAnalytics(app);
    }
    return _analytics;
}

// Convenience export for components that only run client-side
export const auth = typeof window !== "undefined" ? getAuth(app) : (null as unknown as Auth);

export default app;
