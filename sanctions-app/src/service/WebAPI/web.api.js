import axios from "axios";
const webAxiosInstance = axios.create({
  baseURL: "http://localhost:5000/api/",
  headers: {
    "Content-Type": "application/json"
  },
});
export default webAxiosInstance;