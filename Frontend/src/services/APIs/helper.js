import { errorMessage, successMessage } from "@/Utilities/toasters";
import { getToken, getUser, removeRole, removeToken, removeUser, setToken } from "../firebase-services/cookies";
import { toast } from 'react-toastify';
import { auth } from "../firebase-services/firebase";
import dayjs from "dayjs";
export const URL = 'https://dream-book-backend-mu.vercel.app/v1';

export const getAuthToken = async () => {
    const cookieString = getToken();

    if (cookieString) {
        const { value, expiry } = JSON.parse(cookieString);

        const expiryDate = dayjs(expiry); // When the token will expire
        const currentDate = dayjs(); // Current date and time
        const differenceInMinutes = expiryDate.diff(currentDate, 'minute');

        if (differenceInMinutes <= 15) {
            // Refresh token if it's close to expiration (within 15 mins)
            const refreshedToken = await refreshTokenIfNeeded();
            return refreshedToken || value; // return refreshed token if available, otherwise return current
        }

        return value; // return the current token if not near expiry
    }

    return false; // No token found
};

const refreshTokenIfNeeded = async () => {
    try {
        const currentUser = await getAuthCurrentUser();
        if (currentUser) {
            const refreshedToken = await currentUser.getIdToken(true);
            const expiryTime = new Date(Date.now() + 3600 * 1000); // Set expiry for 1 hour from now
            setToken(refreshedToken, expiryTime); // Update cookie with new token and expiry
            return refreshedToken;
        }
    } catch (error) {
        console.error('Error refreshing token:', error);
    }
    return null; // Return null if token refresh fails
};

// Retry function for getting auth.currentUser with a retry limit
const getAuthCurrentUser = async (retryCount = 5, delay = 2000) => {
    for (let i = 0; i < retryCount; i++) {
        if (auth.currentUser) {
            return auth.currentUser;
        }
        await new Promise(resolve => setTimeout(resolve, delay));
    }
    console.warn('auth.currentUser is null after maximum retries');
    return null;
};
export const getUserDetail = () => {
    const cookieString = getUser();
    if (cookieString) {
        return cookieString;
    }
    return false
}
export const responseValidator = async (response , isToaster=false, message=null) => {
    if(response.status == 204){
        if(isToaster){
            successMessage("Deleted Successfully.")
        }
        return {status: true}
    }
    else if(response.ok){
        const res = await response.json()
        if (Array.isArray(res.data)) {
            if(isToaster){
                successMessage((!message || message.length==0) ?res.message:message)
            }
            return {status: true, data: [...res.data ]}
        } else if (typeof res.data === 'object') {
            if(isToaster){
                successMessage((!message || message.length==0) ?res.message:message)
            }
            return {status: true, data: res.data}
        } else if (typeof res.data === 'string') {
            if(isToaster){
                successMessage((!message || message.length==0) ?res.message:message)
            }
            return {status: true, data: res.data}
        }else {
            if(isToaster){
                successMessage((!message || message.length==0) ?res.message:message)
            }
            return {status: true, message: res.message}
        }
    }
    else if(response.status == 401){
        const res = await response.json();
        errorMessage(res.message)
        return {status: false, code:401, message: "Session Expired."}
    }
    else if(response.status == 413){
        errorMessage("Media file which you attach is too large.")
        return {status: false, code:413, message: "file-size-too-large"}
    }
    else if(response.status == 404){
        if(!isToaster){
            errorMessage("API not found on this server.")
        }
        return {status: false, code:404, message: "file-size-too-large"}
    }
    else if(response.status == 403){
        removeToken();
        removeRole();
        removeUser();
        return {status: false, code:404, message: "file-size-too-large"}
    }
    else if(response.status >= 400 && response.status < 500){
        const res = await response.json();
        errorMessage(res.message,`API-400-error${Math.random()}`);
        return {status: false, code: response.status, message: res}
    }
    else if(response.status >= 500){
        const res = await response.json()
        errorMessage(res.message,`API-500-error${Math.random()}`)
        return {status: false, code:response.status, message: "Encounter Server Side Error."}
    }
    else{
        errorMessage("Something went wrong")
        return {status: false, code:response.status, message: "Something went wrong."}
    }
}
export const apiError = (e) => {
    if(e.name === "AbortError"){
    }
    else{
        errorMessage("Takes more than the usual time. Please refresh the page.",`API-Timeout-error`)
    }
    return {status: false, message: e}
}
export const isLiked = (likeBy, server=false, currentUser=null) => {
    if(!likeBy){
        return false
    }
    const user = !server?getUserDetail():currentUser;
    
    const filterdData = likeBy.filter(item => item == user.userId)
    if(filterdData.length > 0){
        return true;
    }
    return false;
}