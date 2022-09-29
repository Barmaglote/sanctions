import { LocalScheme } from '~auth/runtime'

export default class LocalAuthScheme extends LocalScheme {
  // Override `fetchUser` method of `local` scheme
  async fetchUser (endpoint) {

    console.log("test1")

    // Token is required but not available
    if (!this.check().valid) {
      console.log("test2")
      return
    }

    // User endpoint is disabled.
    if (!this.options.endpoints.user) {
      console.log("test3")
      this.$auth.setUser({})
      return
    }
    
    // Try to fetch user and then set
    return this.$auth.requestWith(
      this.name,
      endpoint,
      this.options.endpoints.user
    ).then((response) => {
      console.log("test4")
      const user = getProp(response.data, this.options.user.property)
      console.log("test5")
      console.log(user);

      // Transform the user object
      const customUser = {
        ...user,
        fullName: user.username,
        roles: ['user']
      }

      console.log("test6")

      // Set the custom user
      // The `customUser` object will be accessible through `this.$auth.user`
      // Like `this.$auth.user.fullName` or `this.$auth.user.roles`
      this.$auth.setUser(customUser)
      console.log("test7")
      return response
    }).catch((error) => {
      this.$auth.callOnError(error, { method: 'fetchUser' })
    })
  }
}