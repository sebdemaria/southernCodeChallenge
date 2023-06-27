import axios from "axios";

export const HttpClient = (BASE_URL, timeout = 2000) =>
    axios.create({
        baseURL: BASE_URL,
        timeout: timeout,
    });
