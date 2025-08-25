import { createContext, useEffect, useState } from "react";

import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../Hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app)
const AuthProvider = ({ children }) => {
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();


    // login with email-pass
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const updateUserProfile = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        })

    }

    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }


    const logout = () => {
        setLoading(true);
        signOut(auth);
    }





    // checking user
    // useEffect(()=> {
    //     const unSubscribe = onAuthStateChanged(auth, currentUser => {
    //         setUser(currentUser);
    //         setLoading(false);  
    //         if(currentUser){
    //             const userInfo = {email: currentUser.email}
    //             axiosPublic.post('/jwt', userInfo)
    //             .then(res => {
    //                 if(res.data.token){
    //                     localStorage.setItem('access-token', res.data.token)
    //                 }
    //             })
    //         }
    //         else{
    //             localStorage.removeItem('access-token');
    //         }
    //     })

    //     return () => {
    //         return unSubscribe;
    //     }
    // },[axiosPublic, user])
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                // get token and store client
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setLoading(false);
                        }
                    })
            }
            else {
                localStorage.removeItem('access-token');
                setLoading(false);
            }
        });
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic])



    const AuthInfo = {
        user,
        loading,
        setLoading,
        createUser,
        signIn,
        logout,
        updateUserProfile,
        googleSignIn
    }
    return (
        <AuthContext.Provider value={AuthInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;