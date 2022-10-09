import axios from "axios";

export default ({ app }, inject) => {    
  inject('webapi', () => {
    const webapi = axios.create({
      baseURL: "http://localhost:5000/api/v1", // TODO: take it from process.env
      headers: {
        "Content-Type": "application/json",
        "Authorization": app.$auth.strategy.token.get()
      },
    })

    webapi.interceptors.response.use(
      (res) => {
        return res;
      },
      async (err) => {
        app.$toast.error(err.message)
        return Promise.reject(err);
      }
    )

    return webapi;
  })
}