import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { provider } from "../js/firebase-config"; //

const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  async function logUserIn(email, password) {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password).catch((error) => {
      throw error;
    });
  }

  async function logUserInWithGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider).catch((error) => {
      throw error;
    });
  }

  async function signUserOut() {
    const auth = getAuth();
    await signOut(auth).catch((error) => {
      throw error;
    });
  }

  async function signUserUp(name, email, password) {
    const auth = getAuth();
    await createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name,
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  function getUser() {
    return currentUser;
  }

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    getUser,
    logUserIn,
    logUserInWithGoogle,
    signUserOut,
    signUserUp,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
