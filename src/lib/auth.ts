import {
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    onAuthStateChanged,
    User,
} from "firebase/auth";
import { getClientAuth } from "./firebase";

const googleProvider = new GoogleAuthProvider();

export async function signInWithGoogle(): Promise<User> {
    const result = await signInWithPopup(getClientAuth(), googleProvider);
    return result.user;
}

export async function signOutUser(): Promise<void> {
    await signOut(getClientAuth());
}

export function onAuthChange(callback: (user: User | null) => void) {
    return onAuthStateChanged(getClientAuth(), callback);
}

export type { User };
