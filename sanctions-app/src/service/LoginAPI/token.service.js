const localStorageKey = 'barmaglote.sanctions.user'; // TODO: Move to .env

class TokenService {
    getLocalRefreshToken() {
      const user = JSON.parse(localStorage.getItem(localStorageKey));
      return user?.refreshToken;
    }
    getLocalAccessToken() {
      const user = JSON.parse(localStorage.getItem(localStorageKey));
      return user?.accessToken;
    }
    updateLocalAccessToken(token) {
      let user = JSON.parse(localStorage.getItem(localStorageKey));
      user.accessToken = token;
      localStorage.setItem(localStorageKey, JSON.stringify(user));
    }
    getUser() {
      return JSON.parse(localStorage.getItem(localStorageKey));
    }
    setUser(user) {
      console.log(JSON.stringify(user));
      localStorage.setItem(localStorageKey, JSON.stringify(user));
    }
    removeUser() {
      localStorage.removeItem(localStorageKey);
    }
  }
  export default new TokenService();