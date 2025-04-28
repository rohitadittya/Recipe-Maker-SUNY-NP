import { displayErrToast } from "./errorUtils.js";

const API_BASE_URL = "http://localhost:3000/api";

const constructUrl = (url, params) => {
    const apiUrl = `${API_BASE_URL}${url}`;
    if (!params) return apiUrl;

    const urlParams = new URLSearchParams(params).toString();
    return `${apiUrl}?${urlParams}`;
}

const constructHeaders = (headers) => {
    const token = window.sessionStorage.getItem("JWT_TOKEN") || null;
    return {
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : null,
        ...headers,
    };
}

/**
 * 
 * @param {*} apiUrl - This is the endpoint URL without base url. For example: /user/login
 * @param {*} method - HTTP method (GET, POST, PUT, PATCH, DELETE)
 * @param {*} body - Request Body Object
 * @param {*} queryParams - Query Parameters Object, eg: { id: 1, name: "test" }
 * @param {*} headers - Headers Object, eg: { "Content-Type": "application/json" }
 * @returns 
 */
export const httpClient = async (apiUrl, method = "GET", body = null, queryParams = null, headersObj = {}) => {
    const url = constructUrl(apiUrl, queryParams);
    const options = {
        method,
        body: body ? JSON.stringify(body) : null,
        headers: constructHeaders(headersObj),
    }

    const response = await fetch(url, options);
    
    if (!response.ok) {
        const err = await response.json();
        displayErrToast(err)
        throw err;
    }

    return await response.json();
};