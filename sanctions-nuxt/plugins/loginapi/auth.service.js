import TokenService from './token.service.js'

export default ({ app }, inject) => {    
  inject('login', async (user) => {
    return app.$auth.loginWith('local', { data: user })
  })

  inject('changepassword', async (user,password) => {
    return app.$loginapi().post('auth/changepassword', {
        login: user.login,
        password: user.password, // TODO: cypher!
        oldpassword: password // TODO: cypher!
      }) 
  })

  inject('logout', async () => {
    return app.$auth.logout('local');
  })

  inject('register', async (user) => {  
    return app.$loginapi().post('auth/signup', {
      username: user.username,
      login: user.login,
      password: user.password // TODO: cypher!
    });
  })

  inject('requestrestore', async (login) => {  
    return app.$loginapi().post('auth/requestrestore', {login});
  })

  inject('restore', async (password, token, login) => {    
    return app.$loginapi().post('auth/restore', {password, token, login});
  })

  inject('confirm', async (login, token) => {
    return app.$loginapi().post('auth/confirm', {login, token});
  })
}