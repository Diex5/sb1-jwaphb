<template>
  <div class="h-full flex flex-col">
    <div class="p-4 border-b">
      <h2 class="text-xl font-bold">Shopping Cart</h2>
    </div>
    
    <div class="flex-1 overflow-y-auto p-4">
      <div v-if="items.length === 0" class="text-center text-gray-500 mt-8">
        Your cart is empty
      </div>
      
      <div v-else class="space-y-4">
        <div v-for="item in items" :key="item.id" class="flex gap-4 border-b pb-4">
          <img :src="item.image" :alt="item.name" class="w-20 h-20 object-cover rounded" />
          <div class="flex-1">
            <h3 class="font-semibold">{{ item.name }}</h3>
            <p class="text-gray-600">${{ item.price }}</p>
            <div class="flex items-center gap-2 mt-2">
              <button 
                class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                @click="$emit('update', item.id, item.quantity - 1)"
              >
                <i class="pi pi-minus"></i>
              </button>
              <span>{{ item.quantity }}</span>
              <button 
                class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                @click="$emit('update', item.id, item.quantity + 1)"
              >
                <i class="pi pi-plus"></i>
              </button>
              <button 
                class="ml-auto text-red-500"
                @click="$emit('remove', item.id)"
              >
                <i class="pi pi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="p-4 border-t bg-gray-50">
      <div class="flex justify-between mb-4">
        <span class="font-bold">Total:</span>
        <span class="font-bold">${{ total.toFixed(2) }}</span>
      </div>
      
      <div v-if="showPayment">
        <PaymentMethods 
          :amount="total"
          @payment-success="handlePaymentSuccess"
          @payment-error="handlePaymentError"
        />
      </div>
      <PrimeButton 
        v-else
        label="Proceed to Checkout" 
        icon="pi pi-check"
        :disabled="items.length === 0"
        class="w-full"
        @click="showPayment = true"
      />
    </div>
  </div>
</template>

<script setup>
const { $toast } = useNuxtApp()
const showPayment = ref(false)

const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const total = computed(() => 
  props.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
)

const handlePaymentSuccess = (paymentDetails) => {
  $toast.add({
    severity: 'success',
    summary: 'Payment Successful',
    detail: 'Your order has been placed successfully!',
    life: 3000
  })
  showPayment.value = false
}

const handlePaymentError = (error) => {
  $toast.add({
    severity: 'error',
    summary: 'Payment Failed',
    detail: error.message || 'There was an error processing your payment.',
    life: 3000
  })
}

defineEmits(['remove', 'update'])
</script>