<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <PrimeCard v-for="product in products" :key="product.id" class="hover:shadow-lg transition-shadow">
      <template #header>
        <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover" />
      </template>
      <template #title>
        {{ product.name }}
      </template>
      <template #content>
        <p class="text-2xl font-bold text-gray-800">${{ product.price }}</p>
      </template>
      <template #footer>
        <PrimeButton 
          icon="pi pi-shopping-cart" 
          label="Add to Cart"
          @click="$emit('add-to-cart', product)"
          class="w-full"
        />
      </template>
    </PrimeCard>
  </div>
</template>

<script setup>
defineProps({
  products: {
    type: Array,
    required: true
  }
})

defineEmits(['add-to-cart'])
</script>