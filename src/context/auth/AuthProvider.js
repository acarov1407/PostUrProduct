import { createContext, useState, useEffect } from "react";
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    updateProfile,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "firebase/auth";

import { useRouter } from "next/router";

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [authUser, setAuthUser] = useState(null);
    const [isLoadingAuth, setIsLoadingAuth] = useState(true);
    const [isLoadingAuthForm, setIsLoadingAuthForm] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [alert, setAlert] = useState("");


    useEffect(() => {
        const auth = getAuth();
        const unsuscribe = onAuthStateChanged(auth, user => {
            if (user) {
                setAuthUser(user);
            } else {
                setAuthUser(null);
            }

            setIsLoadingAuth(false);
        });

        return () => unsuscribe;
    }, []);

    const router = useRouter();

    const handleAlert = (alert) => {
        setAlert(alert);
        setTimeout(() => {
            setAlert("");
        }, 7000);
    }

    const signUp = async ({ name, email, password }) => {
        setIsLoadingAuthForm(true);
        const auth = getAuth();
        try {
            const createdUser = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(createdUser.user, {
                displayName: name
            });

            await sendEmailVerification(createdUser.user);
            await signInWithEmailAndPassword(auth, email, password);
            router.push('/auth/email-verification');

        } catch (error) {
            handleAlert(error?.message || 'Ha ocurrido un error al intentar registrarse');
        } finally {
            setIsLoadingAuthForm(false);
        }
    }

    const logout = async () => {
        setIsLoggingOut(true);
        const auth = getAuth();

        try{
            await router.push('/');
            await signOut(auth);
        }catch(error){
            console.log(error);
        } finally {
            setIsLoggingOut(false);
        }
              
    }

    const login = async ({ email, password }) => {
        if(authUser) await logout();
        setIsLoadingAuthForm(true);
        const auth = getAuth();
        try {
            const loggedUser = await signInWithEmailAndPassword(auth, email, password);
            if (!loggedUser.user.emailVerified) {
                handleAlert("Tu correo electrónico aún no ha sido verificado");
                await signOut(auth);
                return;
            }
            await router.push('/');
        } catch (error) {
            handleAlert(error?.message || 'Ha ocurrido un error al intentar iniciar sesión');
        } finally {
            setIsLoadingAuthForm(false);
        }
    }

    
    return (
        <AuthContext.Provider
            value={{
                alert,
                handleAlert,
                signUp,
                login,
                logout,
                isLoadingAuth,
                isLoadingAuthForm,
                isLoggingOut,
                authUser,
                
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext

export {
    AuthProvider
}