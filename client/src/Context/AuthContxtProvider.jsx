import { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();
    const updateUser = (name, photoUrl) => updateProfile(auth.currentUser, { displayName: name, photoURL: photoUrl })
    const createUser = (email, password) => createUserWithEmailAndPassword(auth, email, password)
    const sigInUser = (email, password) => signInWithEmailAndPassword(auth, email, password)
    const googleSignIn = () => signInWithPopup(auth, googleProvider)
    const githubSignIn = () => signInWithPopup(auth, githubProvider)
    const signOutUser = () => signOut(auth)
    useEffect(() => {
        onAuthStateChanged(auth, (u) => {
            if (u) setUser(u)
            else setUser(null)
            setLoading(false);
        })
    }, [])

    return (
        <AuthContext.Provider value={{ user, loading, createUser, updateUser, sigInUser, signOutUser, googleSignIn, githubSignIn }}>
            {children}
        </AuthContext.Provider>
    )
}