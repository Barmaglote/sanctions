import axios from "axios";

export default ({ app }, inject) => {    
  inject('loginapi', () => {
    const loginapi = axios.create({
      baseURL: "http://localhost:4000/api/",
      headers: {
        "Content-Type": "application/json",
        "Authorization": app.$auth.strategy.token.get()
      },
    })

    loginapi.interceptors.response.use(
      (res) => {
        return res;
      },
      async (err) => {
        app.$toast.error(err.message)
        return Promise.reject(err);
      }
    )

    return loginapi;
  })
}
