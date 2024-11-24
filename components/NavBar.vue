<template>
  <nav class="bg-white shadow-md">
    <div class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-800">Shop</h1>
        <button 
          class="relative p-2 hover:bg-gray-100 rounded-full"
          @click="$emit('toggle-cart')"
        >
          <i class="pi pi-shopping-cart text-xl"></i>
          <PrimeBadge 
            v-if="totalItems" 
            :value="totalItems" 
            class="absolute -top-1 -right-1"
          />
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
const props = defineProps({
  cartItems: {
    type: Array,
    required: true
  }
})

const totalItems = computed(() => 
  props.cartItems.reduce((sum, item) => sum + item.quantity, 0)
)

defineEmits(['toggle-cart'])
</script>