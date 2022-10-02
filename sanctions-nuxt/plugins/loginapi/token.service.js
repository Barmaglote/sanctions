export default ({ app }, inject) => {    
  inject('getLocalRefreshToken', async () => {
    return app.$auth.strategy.token.get()    
  })

  inject('getLocalAccessToken', async () => {
    return app.$auth.strategy.refreshToken.get()    
  })

  inject('updateLocalToken', async (accessToken, refreshToken) => {
    app.$auth.setUserToken(accessToken, refreshToken)
  })  

  
}