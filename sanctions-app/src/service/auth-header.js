const localStorageKey = 'barmaglote.sanctions.user'; // TODO: Move to .env

export default function authHeader() {
    let user = JSON.parse(localStorage.getItem(localStorageKey));
    if (user && user.accessToken) {
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
  }