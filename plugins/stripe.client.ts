import { loadStripe } from '@stripe/stripe-js'

export default defineNuxtPlugin(async () => {
  const stripe = await loadStripe('pk_test_your_publishable_key')
  return {
    provide: {
      stripe
    }
  }
})