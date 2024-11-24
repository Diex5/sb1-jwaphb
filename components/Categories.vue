<template>
  <div class="mb-8">
    <div class="flex gap-4 overflow-x-auto pb-4">
      <PrimeButton
        v-for="category in categories"
        :key="category.id"
        :class="[
          'whitespace-nowrap',
          selectedCategory === category.id ? 'bg-primary' : 'bg-gray-200'
        ]"
        @click="$emit('select', category.id)"
      >
        {{ category.name }}
      </PrimeButton>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  categories: {
    type: Array,
    required: true
  }
})

const selectedCategory = ref('all')
defineEmits(['select'])
</script>