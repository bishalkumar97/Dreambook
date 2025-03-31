import { appendQueryParams } from "../server-apis/helper";
import { URL, responseValidator, apiError, getAuthToken } from "./helper";
export const getAllEmployees = async (payload) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${await getAuthToken()}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+`/users${appendQueryParams(payload)}`, requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }
}
export const getSingleEmployees = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${await getAuthToken()}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+`/users/${id}`, requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }
}

export const addEmployees = async (payload) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${await getAuthToken()}`);
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(payload);
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    try{
        const response = await fetch(URL+"/auth/add-employee", requestOptions)
        return responseValidator(response, true)
    }
    catch(e){
        return apiError(e)
    }
}

export const editEmployees = async (payload, id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${await getAuthToken()}`);
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(payload);
    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    try{
        const response = await fetch(URL+`/users/employee/${id}`, requestOptions)
        return responseValidator(response, true)
    }
    catch(e){
        return apiError(e)
    }
}