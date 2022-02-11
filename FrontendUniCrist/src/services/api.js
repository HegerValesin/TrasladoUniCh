import axios from "axios";

const api = axios.create({
    baseURL: "http://hegervalesin:3333/",
})

export default api;