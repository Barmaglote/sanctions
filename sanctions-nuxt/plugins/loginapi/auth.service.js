import loginAxiosInstance from './login.api.js'
import TokenService from './token.service.js'

export default ({ app }, inject) => {    
  inject('login', async (user) => {
    // return app.$auth.loginWith('local', { data: user })

    const response = await app.$auth.loginWith('local', {data: user })
    
    app.$console.log(response)
    console.log(response)

    if (response.status == 200) {
      await app.$auth.setUser(user)
      await app.$auth.setUserToken(response.accessToken, response.refreshToken)
    }
    
  
    return response.status == 200;

    /*
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
    */
  })

  inject('changePassword', async (user,password) => {
    return loginAxiosInstance
      .post('auth/changepassword', {
        login: user.login,
        password: user.password,
        oldpassword: password
      })
  })

  inject('logout', async () => {
    TokenService.removeUser();
  })

  inject('register', async (user) => {  
    return loginAxiosInstance.post('auth/signup', {
      username: user.username,
      login: user.login,
      password: user.password // TODO: cypher!
    });
  })

  inject('requestrestore', async (login) => {  
    return loginAxiosInstance.post('auth/requestrestore', {login});
  })

  inject('restore', async (password, token, login) => {
    return loginAxiosInstance.post('auth/restore', {password, token, login});
  })

  inject('confirm', async (login, token) => {
    return loginAxiosInstance.post('auth/confirm', {login, token});
  })

  inject('refreshtoken', async () => {
    return loginAxiosInstance.post('auth/refresh-token', TokenService.getLocalRefreshToken());
  })
}