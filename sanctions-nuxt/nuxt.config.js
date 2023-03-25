const result = require('dotenv').config()

if (result.error) {
  throw result.error
}

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Stop the war in Ukraine!',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/icons/favicon.ico' }],
	  link: [{ rel:"apple-touch-icon", sizes:"57x57", href:"/icons/apple-icon-57x57.png" }],
	  link: [{ rel:"apple-touch-icon", sizes:"60x60", href:"/icons/apple-icon-60x60.png" }],
	  link: [{ rel:"apple-touch-icon", sizes:"72x72", href:"/icons/apple-icon-72x72.png" }],
	  link: [{ rel:"apple-touch-icon", sizes:"76x76", href:"/icons/apple-icon-76x76.png" }],
	  link: [{ rel:"apple-touch-icon", sizes:"114x114", href:"/icons/apple-icon-114x114.png"}],
	  link: [{ rel:"apple-touch-icon", sizes:"120x120", href:"/icons/apple-icon-120x120.png"}],
	  link: [{ rel:"apple-touch-icon", sizes:"144x144", href:"/icons/apple-icon-144x144.png"}],
	  link: [{ rel:"apple-touch-icon", sizes:"152x152", href:"/icons/apple-icon-152x152.png"}],
	  link: [{ rel:"apple-touch-icon", sizes:"180x180", href:"/icons/apple-icon-180x180.png"}],
	  link: [{ rel:"icon", type:"image/png", sizes:"192x192", href:"/icons/android-icon-192x192.png"}],
	  link: [{ rel:"icon", type:"image/png", sizes:"32x32", href:"/icons/favicon-32x32.png"}],
	  link: [{ rel:"icon", type:"image/png", sizes:"96x96", href:"/icons/favicon-96x96.png"}],
	  link: [{ rel:"icon", type:"image/png", sizes:"16x16", href:"/icons/favicon-16x16.png"}],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'primeflex/primeflex.css',
    '@/styles/overrides.scss',
    '@/styles/styles.scss',
    'primeicons/primeicons.css',
    '@/styles/flags.scss'
  ],

  publicRuntimeConfig: {
    recaptcha: {
      hideBadge: false,
      siteKey: process.env.RECAPTCHA_SITE_KEY,
      size: 'normal',
      version: 3,
      mode: 'base'
    }
  },

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/webapi/profile.service.js',
    '@/plugins/webapi/comments.service.js',
    '@/plugins/webapi/likes.service.js',
    '@/plugins/local/menu.service.js',
    '@/plugins/webapi/links.service.js',
    '@/plugins/webapi/persons.service.js',
    '@/plugins/webapi/posts.service.js',
    '@/plugins/webapi/tags.service.js',
    '@/plugins/webapi/organizations.service.js',
    '@/plugins/loginapi/auth.service.js',
    '@/plugins/loginapi/token.service.js',
    '@/plugins/webapi/subscribtion.service.js',
    '@/plugins/webapi/web.api.js',
    '@/plugins/loginapi/login.api.js',
    '@/plugins/graphql/apollo-client.js',
    '@/plugins/filters/numbers.js',
    '@/plugins/filters/dates.js',
    /*{src: '@/plugins/editors/quill.js', ssr: false}*/
    /*'~/plugins/graphql/fetch-types.js'*/ /* run it to get new types list for GraphQL*/
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/dotenv',
    ['@pinia/nuxt', { disableVuex: false }],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // Doc: https://www.primefaces.org/primevue/showcase-v2/#/setup
    'primevue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    '@pinia/nuxt',
    '@nuxtjs/composition-api/module',
    '@nuxtjs/auth-next',
    'nuxt-browser-console',
    '@nuxtjs/toast',
    '@nuxtjs/recaptcha',
    '@nuxtjs/apollo'
  ],

  browserConsole: {
    namespace: 'console'
  },

  auth: {
    localStorage: {
      prefix: 'auth.'
    },
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'accessToken',
          data: 'accessToken',
          global: true,
          maxAge: 1800,  // in seconds 1800 sec = 30 min
          name: 'authorization'
        },
        refreshToken: {
          property: 'refreshToken',
          data: 'refreshToken',
          maxAge: 60 * 60 * 24 * 30 // in seconds, 30 days
        },
        user: {
          property: 'user', // here should be `false`, as you defined in user endpoint `propertyName`
          autoFetch: true
        },
        endpoints: {
          login: { url: 'http://localhost:4000/api/auth/signin', method: 'post' },
          logout: { url: 'http://localhost:4000/api/auth/logout', method: 'post' },
          user: { url: 'http://localhost:4000/api/auth/user/', method: 'get' },
          refresh: { url: 'http://localhost:4000/api/auth/refreshtoken', method: 'post' },
        }
      }
    },
    redirect: {
      home: '/',
      logout: '/auth/login',
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  loading: {
    color: '#666',
    height: '5px'
  },

  loadingIndicator: {
    name: 'circle',
    color: '#3B8070',
    background: 'white'
  },

  toast: {
    position: 'top-right',
    duration: 3000,
  },

  env: {
    WEB_STATIC_FILES: process.env.WEB_STATIC_FILES,
    SITE_TITLE: process.env.SITE_TITLE
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // https://github.com/primefaces/primevue/issues/844
    transpile: ['primevue', '@vue/apollo-composable'],
    extend(config) {
      config.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      })
    },
    postcss: null
  },

  apollo: {
    clientConfigs: {
      default: '~/plugins/graphql/apollo-client.js'
    }
  },
}


