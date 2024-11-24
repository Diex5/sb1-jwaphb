<template>
  <div class="space-y-4">
    <div 
      v-if="isGooglePayAvailable" 
      id="google-pay-button"
      class="w-full h-14"
    ></div>

    <div class="relative">
      <div class="absolute inset-0 flex items-center">
        <div class="w-full border-t border-gray-300"></div>
      </div>
      <div class="relative flex justify-center text-sm">
        <span class="px-2 bg-white text-gray-500">or pay with card</span>
      </div>
    </div>

    <form @submit.prevent="handleCardPayment" class="space-y-4">
      <div id="card-element" class="p-3 border rounded-md"></div>
      <div id="card-errors" class="text-red-500 text-sm" role="alert"></div>
      
      <PrimeButton 
        type="submit"
        :loading="loading"
        label="Pay Now"
        icon="pi pi-lock"
        class="w-full"
      />
    </form>
  </div>
</template>

<script setup>
const { $stripe } = useNuxtApp()
const loading = ref(false)
const isGooglePayAvailable = ref(false)
const elements = ref(null)
const card = ref(null)

const emit = defineEmits(['payment-success', 'payment-error'])

const props = defineProps({
  amount: {
    type: Number,
    required: true
  }
})

onMounted(async () => {
  // Initialize Stripe Elements
  elements.value = $stripe.elements()
  card.value = elements.value.create('card')
  card.value.mount('#card-element')

  // Listen for errors
  card.value.addEventListener('change', (event) => {
    const displayError = document.getElementById('card-errors')
    if (event.error) {
      displayError.textContent = event.error.message
    } else {
      displayError.textContent = ''
    }
  })

  // Check Google Pay availability
  const paymentRequest = $stripe.paymentRequest({
    country: 'US',
    currency: 'usd',
    total: {
      label: 'Shopping Cart Total',
      amount: Math.round(props.amount * 100)
    },
    requestPayerEmail: true
  })

  const prButton = elements.value.create('paymentRequestButton', {
    paymentRequest,
  })

  const result = await paymentRequest.canMakePayment()
  isGooglePayAvailable.value = !!result

  if (isGooglePayAvailable.value) {
    prButton.mount('#google-pay-button')
    
    paymentRequest.on('paymentmethod', async (ev) => {
      loading.value = true
      try {
        // Here you would typically make an API call to your backend
        // to create a payment intent and confirm the payment
        emit('payment-success', { 
          paymentMethod: ev.paymentMethod,
          type: 'google-pay' 
        })
      } catch (error) {
        emit('payment-error', error)
      } finally {
        loading.value = false
      }
    })
  }
})

const handleCardPayment = async () => {
  loading.value = true
  try {
    const { token, error } = await $stripe.createToken(card.value)
    if (error) {
      const errorElement = document.getElementById('card-errors')
      errorElement.textContent = error.message
      emit('payment-error', error)
    } else {
      // Here you would typically make an API call to your backend
      // to process the payment with the token
      emit('payment-success', { 
        token,
        type: 'card'
      })
    }
  } catch (error) {
    emit('payment-error', error)
  } finally {
    loading.value = false
  }
}

onUnmounted(() => {
  if (card.value) {
    card.value.destroy()
  }
})
</script>