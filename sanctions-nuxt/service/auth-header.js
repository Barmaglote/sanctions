import TokenService from './LoginAPI/token.service';

export default function authHeader() {
    let user = TokenService.getUser();
    if (user && user.accessToken) {
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
  }