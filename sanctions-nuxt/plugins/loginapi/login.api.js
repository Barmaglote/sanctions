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
        return Promise.reject(err);
        /*
          const originalConfig = err.config;
          if (originalConfig.url !== "/auth/signin" && err.response) {
    
            // Access Token was expired
            if (err.response.status === 401 && !originalConfig._retry) {            
    
              originalConfig._retry = true;
              try {

                  console.log("app.$getLocalRefreshToken()", app.$getLocalRefreshToken())

                  const response = await loginapi.post("/auth/refreshtoken", {
                    refreshToken: app.$getLocalRefreshToken()
                  });
     
                const { status, accessToken } = response.data;
    
                if (status) {
                  app.$updateLocalAccessToken(accessToken);
                }
                
                return loginapi(originalConfig);  
              } catch (_error) {
                return Promise.reject(_error);
              }
            }            
          } else {
            return Promise.reject(err);
          }
          */
      }
    )

    return loginapi;
  })
}
