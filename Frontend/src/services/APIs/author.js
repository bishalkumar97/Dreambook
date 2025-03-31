import { appendQueryParams } from "../server-apis/helper";
import { URL, responseValidator, apiError, getAuthToken } from "./helper";
export const getAllAuthors = async (payload) => {
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
export const getSingleAuthor = async (id) => {
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

export const addAuthor = async (payload) => {
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
        const response = await fetch(URL+"/auth/add-author", requestOptions)
        return responseValidator(response, true)
    }
    catch(e){
        return apiError(e)
    }
}

export const editAuthor = async (payload, id) => {
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
        const response = await fetch(URL+`/users/author/${id}`, requestOptions)
        return responseValidator(response, true)
    }
    catch(e){
        return apiError(e)
    }
}