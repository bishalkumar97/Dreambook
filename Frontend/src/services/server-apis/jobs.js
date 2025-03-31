import { responseValidator, apiError, URL, appendQueryParams } from "./helper";

export const getAllJobs = async ( token) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);
    
    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
    
    try{
        const response = await fetch(URL+`/emp_job_list`, requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }
}

export const getSingleJob = async (id, token) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
    };
    try{
        const response = await fetch(URL+`/view_emp_job/${id}`, requestOptions);
        return responseValidator(response);
    }
    catch(e){
        return apiError(e);
    }
}