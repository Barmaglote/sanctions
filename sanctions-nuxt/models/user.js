export default class User {
    constructor(login, username, password, recaptcha) {
      this.login = login;
      this.password = password;
      this.username = username;
      this.recaptcha = recaptcha;
    }    
  }