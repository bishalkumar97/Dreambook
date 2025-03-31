import { appendQueryParams } from "../server-apis/helper";
import { URL, responseValidator, apiError, getAuthToken } from "./helper";
export const getAllBooks = async (payload) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${await getAuthToken()}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+`/books${appendQueryParams(payload)}`, requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }
}
export const getSingleBook = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${await getAuthToken()}`);
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };

    try{
        const response = await fetch(URL+`/books/${id}`, requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }
}

export const addBook = async (payload) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${await getAuthToken()}`);
    // myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: payload,
      redirect: "follow"
    };
    try{
        const response = await fetch(URL+"/books", requestOptions)
        return responseValidator(response, true)
    }
    catch(e){
        return apiError(e)
    }
}

export const editBook = async (payload, id) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${await getAuthToken()}`);
    // myHeaders.append("Content-Type", "application/json");
    const requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: payload,
      redirect: "follow"
    };
    try{
        const response = await fetch(URL+"/books/"+id, requestOptions)
        return responseValidator(response, true)
    }
    catch(e){
        return apiError(e)
    }
}