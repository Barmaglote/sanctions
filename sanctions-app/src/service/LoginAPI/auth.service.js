import loginAxiosInstance from './login.api.js';
import TokenService from './token.service.js';

export default class AuthService {
  login(user) {
    return loginAxiosInstance
      .post('auth/signin', {
        login: user.login,
        password: user.password // TODO: cypher!
      })
      .then(response => {
        if (response.data.accessToken) {
          TokenService.setUser(response.data);
        }
        return {login: user.login, ...response.data};
      });
  }
  logout() {
    TokenService.removeUser();
  }
  register(user) {
    return loginAxiosInstance.post('auth/signup', {
      username: user.username,
      login: user.login,
      password: user.password // TODO: cypher!
    });
  }  
  refreshtoken() {
    return loginAxiosInstance.post('auth/refresh-token', TokenService.getLocalRefreshToken());
  }   
}