// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  build: {
    transpile: ['primevue']
  },
  css: [
    'primevue/resources/themes/lara-light-blue/theme.css',
    'primeicons/primeicons.css',
    '~/assets/css/main.css'
  ],
  app: {
    head: {
      title: 'Nuxt E-commerce',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ]
    }
  },
  devtools: { enabled: false }
})