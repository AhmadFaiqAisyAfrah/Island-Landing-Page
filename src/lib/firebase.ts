import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBapJm8MbyRMM5qvETU4_NAeGX2PTFtbws",
    authDomain: "island-9bdb4.firebaseapp.com",
    projectId: "island-9bdb4",
    storageBucket: "island-9bdb4.firebasestorage.app",
    messagingSenderId: "818377038400",
    appId: "1:818377038400:web:790c73d8a988aa1c395da5",
    measurementId: "G-PTJZDH4E88",
};

// Prevent re-initialization
let app: FirebaseApp | null = null;
let _db: Firestore | null = null;
let _auth: Auth | null = null;

function getFirebaseApp(): FirebaseApp {
    if (!app) {
        app = getApps().length === 0
            ? initializeApp(firebaseConfig)
            : getApps()[0];
    }
    return app;
}

// Firestore - can be initialized on server but used only on client
function getFirestoreInstance(): Firestore {
    if (!_db) {
        _db = getFirestore(getFirebaseApp());
    }
    return _db;
}

// Export db for backwards compatibility
export const db = getFirestoreInstance();

// Auth - MUST be initialized on client only
export function getClientAuth(): Auth {
    if (typeof window === "undefined") {
        throw new Error("getClientAuth() should only be called on the client");
    }
    if (!_auth) {
        _auth = getAuth(getFirebaseApp());
    }
    return _auth;
}
