import webAxiosInstance from './../WebAPI/web.api';
import loginAxiosInstance from './../LoginAPI/login.api';
import authHeader from './../auth-header';
import TokenService from './../LoginAPI/token.service';

const setupInterceptors = () => {
  webAxiosInstance.interceptors.request.use(
    (config) => {
      const token = authHeader();
      if (token) {
        config.headers = {...config.headers, ...token};
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  webAxiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {

        const originalConfig = err.config;
        if (originalConfig.url !== "/auth/signin" && err.response) {

          // Access Token was expired
          if (err.response.status === 401 && !originalConfig._retry) {            
  
            originalConfig._retry = true;
            try {
                const rs = await loginAxiosInstance.post("/auth/refresh-token", {
                refreshToken: TokenService.getLocalRefreshToken(),
              });
   
              const { status, accessToken } = rs.data;

              if (status) {
                TokenService.updateLocalAccessToken(accessToken);
              }
              
              return webAxiosInstance(originalConfig);  
            } catch (_error) {
              return Promise.reject(_error);
            }
          }            
        } else {
          return Promise.reject(err);
        }

    }
  );
};
export default setupInterceptors;