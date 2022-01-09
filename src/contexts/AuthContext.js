// This entire thing was inspired (i.e. copy-pasted) from:
// https://stackoverflow.com/questions/68104551/react-firebase-authentication-and-usecontext
import { createContext, useContext, useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

// Context is something that is shared between all components. Thanks to this
// we do not need to keep the authentication in a state in the main component
// and pass it on as a property. This will hold it instead.
const AuthContext = createContext()

// This will be used by components needing to access authentication somehow.
export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function logUserIn(email, password) {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setCurrentUser(userCredential)
            })
            .catch((error) => {
                console.log(error.code, error.message)
            });
        return currentUser
    }

    function signUserOut() {
        const auth = getAuth()
        signOut(auth).then(() => {
            return true
        }).catch((error) => {
            console.log(error.code, error.message)
            return false
        })
    }

    async function signUserUp(email, password) {
        const auth = getAuth()
        await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setCurrentUser(userCredential)
            })
            .catch((error) => {
                throw error
            });
        return currentUser
    }

    function getUser() {
        return currentUser
    }

    useEffect(() => {
        const auth = getAuth()
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    const value = {
        currentUser,
        getUser,
        logUserIn,
        signUserOut,
        signUserUp
    }

    return (
        <AuthContext.Provider value={value}>
        { !loading && children }
        </AuthContext.Provider>
    )
}
