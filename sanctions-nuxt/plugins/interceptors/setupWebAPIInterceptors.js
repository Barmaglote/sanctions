import webAxiosInstance from '@/plugins/webapi/web.api.js';
import loginAxiosInstance from '@/plugins/loginapi/login.api.js';
import authHeader from '@/plugins/auth-header';
import TokenService from '@/plugins/loginapi/token.service';

import Vue from 'vue'

/*
  webAxiosInstance.interceptors.request.use(
    (config) => {
      const token = authHeader();
      if (token) {
        config.headers = {...config.headers, ...token};
      }
      return config;
    },
    (error) => {
      console.log("TEST");
      return Promise.reject(error);
    }
  );
*/
  /*
  webAxiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {

        console.log(err);

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
  */

  //Vue.use(loginAxiosInstance)