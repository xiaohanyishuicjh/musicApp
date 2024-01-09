import axios from "axios";
let service = axios.create({
    baseURL: "http://localhost:3000",
    timeout: 8000,
    withCredentials: true
});
export default service;