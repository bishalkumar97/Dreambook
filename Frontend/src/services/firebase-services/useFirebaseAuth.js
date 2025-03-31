import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    updateProfile,
    signOut,
    signInWithPopup,
    RecaptchaVerifier, 
    signInWithPhoneNumber,
    linkWithPhoneNumber,
    onIdTokenChanged
} from "firebase/auth";
import { auth, googleProvider } from './firebase';
import { setToken, removeToken, removeUser, setUser, removeRole } from "./cookies";
import { firebaseErrorFinder } from "@/services/firebase-services/firebaseerrors";
import { toast } from 'react-toastify';
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { errorMessage, successMessage } from "@/Utilities/toasters";

export default function useFirebaseAuth() {
    const router = useRouter();
    const recaptchaVerifierRef = useRef(null);
    const confirmationResultRef = useRef(null);

    const createUserWithEmailMethod = async (email, password) => {
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password);
            //  Send a verification email
            await sendEmailVerification(auth.currentUser)
            // Set up the cookie expiry time
            const expiryTime = new Date(Date.now() + 3600 * 1000);
            // Set the cookie
            const token = auth.currentUser.accessToken;
            setToken(token,expiryTime);
            return {status: true, user: auth.currentUser, token: token};
        }
        catch(e){
            const error = firebaseErrorFinder[e.code]?firebaseErrorFinder[e.code]:"Something went wrong with authenticaiton";
            errorMessage(error)
            return {status: false, error: error}
        }
    }

    const resendEmailVerificationLink = async () => {
        try{
            await sendEmailVerification(auth.currentUser)
            successMessage("Verification link has been resend successfully")
            return {status: true}

        }
        catch(e){
            const error = firebaseErrorFinder[e.code]?firebaseErrorFinder[e.code]:"Something went wrong with authenticaiton";
            errorMessage(error)
            return {status: false}

        }
    }

    const loginWithEmailAndPassword = async (email, password, redirect="") => {
        try{
            const res = await signInWithEmailAndPassword(auth,email, password);
            if(!res.user.emailVerified && redirect != ""){
                router.push(redirect)
                return {status: false};
            }
            // Set up the cookie expiry time
            const expiryTime = new Date(Date.now() + 3600 * 1000);
            // Set the cookie
            const token = auth.currentUser.accessToken;
            return {status: true, user: auth.currentUser, token: token, expiryTime};
        }
        catch(e){
            const error = firebaseErrorFinder[e.code]?firebaseErrorFinder[e.code]:"Something went wrong with authenticaiton";
            console.log(e.code)
            errorMessage(error)
            return {status: false, error: error}
        }
    }
    const deleteMyAccount = async () => {
        const user = auth.currentUser;
        await user.delete();
    }

    const logOut = async () => {
        try{
            const res = await signOut(auth);
            removeToken();
            removeUser();
            removeRole();
            successMessage("User has been logged out.")
            return {status: true};
        }
        catch(e){
            const error = firebaseErrorFinder[e.code]?firebaseErrorFinder[e.code]:"Something went wrong with authenticaiton";
            errorMessage(error)
            return {status: false, error: error}
        }
    }

    const forgotPassword = async (email) => {
        await sendPasswordResetEmail(auth, email);
        successMessage("Reset password email has been sent successfully")
    }

    const signInWithGoogle = async () => {
        try{
            const res = await signInWithPopup(auth, googleProvider);
            const user = res.user;

            // Check if this is the user's first sign-in
            const isFirstSignIn = user.metadata.creationTime === user.metadata.lastSignInTime;

            // Set up the cookie expiry time
            const expiryTime = new Date(Date.now() + 3600 * 1000);
            // Set the cookie
            const token = auth.currentUser.accessToken;
            setToken(token,expiryTime);
            return {status: true, user: auth.currentUser, token: token, isFirstSignIn: isFirstSignIn};
        }
        catch(e){
            const error = firebaseErrorFinder[e.code]?firebaseErrorFinder[e.code]:"Something went wrong with authenticaiton";
            errorMessage(error)
            return {status: false, error: error}
        }
    }

    const initializeRecaptcha = (container) => {
        if (!recaptchaVerifierRef.current && container) {
          recaptchaVerifierRef.current = new RecaptchaVerifier(auth, container, {
            'size': 'invisible',
            'callback': (response) => {
              // reCAPTCHA solved, allow user to proceed with authentication
            },
            'expired-callback': () => {
              // Response expired. Ask user to solve reCAPTCHA again.
            }
          });
        }
    };

    const phoneSignIn = async (phoneNumber) => {
        try {
            if (!recaptchaVerifierRef.current) {
                toast.error("ReCAPTCHA verifier not initialized" ,{
                    toastId:"Phone-recaptcha-error-1"
                })
                return {status: false, error: "ReCAPTCHA verifier not initialized"}
            }
            const recaptchaVerifier = recaptchaVerifierRef.current;
            const result = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
            confirmationResultRef.current = result;
            successMessage("OTP has been send to your phone number");
            return {status: true, data: result};
        } catch (e) {
            const error = firebaseErrorFinder[e.code]?firebaseErrorFinder[e.code]:"Something went wrong with authenticaiton";
            errorMessage(error)
            return {status: false, error: error}
        }
    };

    const confirmCode = async (verificationCode) => {
        try {
            const res = await confirmationResultRef.current.confirm(verificationCode);
            const user = res.user;
            // Check if this is the user's first sign-in
            const isFirstSignIn = user.metadata.creationTime === user.metadata.lastSignInTime;

            // Set up the cookie expiry time
            const expiryTime = new Date(Date.now() + 3600 * 1000);
            // Set the cookie
            const token = auth.currentUser.accessToken;
            setToken(token,expiryTime);

            successMessage("Phone number has been verified successfully.")
            return {status: true, user: auth.currentUser, token: token, isFirstSignIn: isFirstSignIn};
        } catch (e) {
            const error = firebaseErrorFinder[e.code]?firebaseErrorFinder[e.code]:"Something went wrong with authenticaiton";
            errorMessage(error)
            return {status: false, error: error}
        }
    };
    
    const linkPhoneNumber = async (phoneNumber) => {
        try {
            if (!recaptchaVerifierRef.current) {
                throw new Error('ReCAPTCHA verifier not initialized');
            }
            const recaptchaVerifier = recaptchaVerifierRef.current;
            const user = auth.currentUser;
            if (!user) {
                errorMessage("No authenticated user found");
                return {status: false, error: "No authenticated user found"}
            }
            const result = await linkWithPhoneNumber(auth.currentUser, phoneNumber, recaptchaVerifier);
            confirmationResultRef.current = result;
            successMessage("Phone number has been verified successfully.")
            return {status: true, message: "Phone number verified."};
        } catch (e) {
            console.log(e);
            const error = firebaseErrorFinder[e.code]?firebaseErrorFinder[e.code]:"Something went wrong with authenticaiton";
            errorMessage(error)
            return {status: false, error: error}
        }
    };
    
    const refreshToken = async () => {
        try{
            const refreshedToken = await auth.currentUser.getIdToken(true);
            const expiryTime = new Date(Date.now() + 3600 * 1000);
            // Set the cookie
            const token = refreshedToken;
            setToken(token,expiryTime);
            return true
        }
        catch(e){
            console.log(e)
            return false;
        }
    }
    return {
        createUserWithEmailMethod,
        resendEmailVerificationLink,
        logOut,
        loginWithEmailAndPassword,
        forgotPassword,
        signInWithGoogle,
        initializeRecaptcha,
        phoneSignIn,
        confirmCode,
        linkPhoneNumber,
        refreshToken,
        deleteMyAccount
    }
}
