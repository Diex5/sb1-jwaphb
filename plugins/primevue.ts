import { defineNuxtPlugin } from '#app'
import PrimeVue from 'primevue/config'
import Button from 'primevue/button'
import Sidebar from 'primevue/sidebar'
import Card from 'primevue/card'
import Badge from 'primevue/badge'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(PrimeVue, { ripple: true })
  nuxtApp.vueApp.use(ToastService)
  
  nuxtApp.vueApp.component('PrimeButton', Button)
  nuxtApp.vueApp.component('PrimeSidebar', Sidebar)
  nuxtApp.vueApp.component('PrimeCard', Card)
  nuxtApp.vueApp.component('PrimeBadge', Badge)
  nuxtApp.vueApp.component('Toast', Toast)
})