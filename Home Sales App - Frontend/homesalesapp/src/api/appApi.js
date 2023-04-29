import axios from "axios";

export const appApi = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});


