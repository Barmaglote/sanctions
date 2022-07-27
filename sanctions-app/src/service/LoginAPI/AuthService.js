import loginAxiosInstance from './LoginAPI.js';

const localStorageKey = 'barmaglote.sanctions.user'; // TODO: Move to .env

export default class AuthService {
  login(user) {
    return loginAxiosInstance
      .post('auth/signin', {
        login: user.login,
        password: user.password // TODO: cypher!
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem(localStorageKey, JSON.stringify({login: user.login, ...JSON.stringify(response.data)})); // TODO: take login from response
        }
        return {login: user.login, ...response.data};
      });
  }
  logout() {
    localStorage.removeItem(localStorageKey);
  }
  register(user) {
    return loginAxiosInstance.post('auth/signup', {
      username: user.username,
      login: user.login,
      password: user.password // TODO: cypher!
    });
  }
}