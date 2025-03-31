import { URL, getAuthToken, responseValidator, apiError } from "./helper";

export const registerEmployer = async (formdata) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${await getAuthToken()}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };
    try{
        const response = await fetch(URL+"/employerRegister", requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e)
    }
}

export const loginEmployer = async (tt) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${tt}`)
    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        // body: payload,
        redirect: "follow"
    };
    try{
        const response = await fetch(URL+"/auth/login", requestOptions)
        return responseValidator(response)
    }
    catch(e){
        return apiError(e)
    }
}
export const updateProfile = async (payload, id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${await getAuthToken()}`)
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(payload);

    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    try{
        const response = await fetch(URL+"/users/author/"+id, requestOptions)
        return responseValidator(response, true)
    }
    catch(e){
        return apiError(e)
    }
}