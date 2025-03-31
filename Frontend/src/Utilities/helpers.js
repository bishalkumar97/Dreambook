import { toast } from 'react-toastify';
import { errorMessage } from './toasters';
export const verifyEmail = (email, message=true) => {
    if(!email && email.trim()==""){
        errorMessage(`Email should not be empty`,{
            toastId:"empty-email-verification-error"
        })
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);
    if(!isValidEmail){
        errorMessage(`"${email}" is an invalid email address`)
    }   
    return isValidEmail;
}

export const comparePasswords = (a,b,message=true) => {
    if(a!=b){
        if(message){
            errorMessage(`Password mismatch`)
        }
        return false;
    }
    return true;
}

export const isRequired = (val, field="", message=true) => {
    if(val && val.trim() !=""){
        return true
    }
    if(message){
        errorMessage(`${field} should not be empty`)
    }
    return false;
}
export const isRequiredSpecialChar = (val, field="", message=true) => {
    if(val && val.trim() != ""){
        if (/^[a-zA-Z\s_]+$/.test(val)) {
            return true;
        } else if (message) {
            errorMessage(`${field} Only alphabets, underscores and whitespaces allowed .`);
        }
    }else if(message){
        errorMessage(`${field} should not be empty`)
    }
    return false;
}
export const stringAndArrayChecker = (val, field="", message=true) => {
    const type = typeof(val)
    if(type == 'string'){
        if(val && val.trim() !=""){
            return true
        }
        if(message){
            errorMessage(`"${field}" should not be empty`)
        }
    }else{
        if(val && val.length > 0){
            return true
        }
        if(message){
            errorMessage(`"${field}" should not be empty`)
        }
    }
    return false;
}
export const stringAndObjectChecker = (val, field="", message=true) => {
    const type = typeof(val)
    if(type == 'string'){
        if(val && val.trim() !=""){
            return true
        }
        if(message){
            errorMessage(`Upload "${field}"`)
        }
    }else{
        if(JSON.stringify(val) === '{}'){
            return true
        }
        if(message){
            errorMessage(`"${field}" should not be empty`)
        }
    }
    return false;
}
export const customUTCDate = (date) => {
    // Convert custom date to UTC
    const universalDateUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return universalDateUTC.toISOString();
}

export const requiredImage = (val, field="", message=true, ) => {
    if(val){
        return true
    }
    if(message){
        toast.error(`Please Upload the ${field} first. `,{
            toastId:"upload-field-verification-error"
        })
    }
    return false;
}
export const imageValidator = (file) => {
    if(file && file.size <= 209715200){
        if(file.type == "image/png" || file.type == "image/jpg" || file.type == "image/jpeg" || file.type == "image/webp" || file.type == "image/gif" || file.type == "image/svg+xml" || file.type == "image/svg"){
            return 'image'
        }else if(file.type == "application/pdf"){
            return 'file'
        }
        else{
            toast.error("File not supported", {
                toastId: "upload-error-1",
            });
            return false
        }
    }else{
        toast.error("File size too large", {
            toastId: "upload-error-1",
        });
        return false;
    }
}


export const generatePassword = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*:;.?";
    const passwordLength = 12;
    let password = "";

    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }

    return password;
}