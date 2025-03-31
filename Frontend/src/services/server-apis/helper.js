
export const URL = 'https://teachsa.luluki.co.za/api';

export const responseValidator = async (response , message=null) => {
    if(response.ok){
        const res = await response.json();
        if (Array.isArray(res.data)) {
            return {status: true,  data: [...res.data ]}
        } else if (typeof res.data === 'object') {
            return {status: true, data: res.data}
        } else if (typeof res.data === 'string') {
            return {status: true, data: res.data}
        }else {
            return {status: false, message: "Not getting the desired API response."}
        }
    }
    else if(response.status == 401){
        return {status: false, code:401, message: "Session Expired."}
    }
    else if(response.status == 413){
        return {status: false, code:413, message: "file-size-too-large"}
    }
    else if(response.status >= 400 && response.status < 500){
        const res = await response.json()
        return {status: false, code:400, message: res.message}
    }
    else if(response.status >= 500){
        console.log(response.message)
        const res = await response.json()
        return {status: false, code:response.status, message: `Encounter Server Side Error:${res.message}` }
    }
    else{
        return {status: false, code:response.status, message: "Something went wrong."}
    }
}

export const apiError = (e) => {
    return {status: false, message: e}
}

export const appendQueryParams = (payload) => {
    let queryParams = "?"
    if(typeof payload !== 'object'){
        return queryParams;
    }

    for (const key in payload){
        queryParams = `${queryParams}${key}=${payload[key]}&`
    }
    return queryParams;
}

export const findInQueryParams = (query, key, value) => {
    console.log(query[key] == value)
    if(query[key] == value){
        return true;
    }
     return false;
}