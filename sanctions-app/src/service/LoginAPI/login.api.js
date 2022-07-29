import axios from "axios";
const loginAxiosInstance = axios.create({
  baseURL: "http://localhost:4000/api/",
  headers: {
    "Content-Type": "application/json",
  },
});
export default loginAxiosInstance;