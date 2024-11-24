<template>
  <div class="min-h-screen bg-gray-50">
    <Toast />
    <NavBar @toggle-cart="isCartOpen = !isCartOpen" :cart-items="cartItems" />
    
    <main class="container mx-auto px-4 py-8">
      <Categories :categories="categories" @select="selectedCategory = $event" />
      <ProductGrid :products="filteredProducts" @add-to-cart="addToCart" />
    </main>

    <PrimeSidebar v-model:visible="isCartOpen" position="right" class="w-full sm:w-[400px]">
      <Cart :items="cartItems" @remove="removeFromCart" @update="updateQuantity" />
    </PrimeSidebar>
  </div>
</template>

<script setup>
const isCartOpen = ref(false)
const selectedCategory = ref('all')
const cartItems = ref([])

const categories = [
  { id: 'all', name: 'All Products' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'clothing', name: 'Clothing' },
  { id: 'books', name: 'Books' },
]

const products = [
  { id: 1, name: 'Wireless Earbuds', price: 99.99, category: 'electronics', image: '/images/earbuds.jpg' },
  { id: 2, name: 'Smart Watch', price: 199.99, category: 'electronics', image: '/images/watch.jpg' },
  { id: 3, name: 'Cotton T-Shirt', price: 24.99, category: 'clothing', image: '/images/tshirt.jpg' },
  { id: 4, name: 'Denim Jeans', price: 59.99, category: 'clothing', image: '/images/jeans.jpg' },
  { id: 5, name: 'Best Seller Book', price: 19.99, category: 'books', image: '/images/book.jpg' },
  { id: 6, name: 'Cookbook', price: 29.99, category: 'books', image: '/images/cookbook.jpg' },
]

const filteredProducts = computed(() => {
  if (selectedCategory.value === 'all') return products
  return products.filter(p => p.category === selectedCategory.value)
})

const addToCart = (product) => {
  const existingItem = cartItems.value.find(item => item.id === product.id)
  if (existingItem) {
    existingItem.quantity++
  } else {
    cartItems.value.push({ ...product, quantity: 1 })
  }
}

const removeFromCart = (productId) => {
  cartItems.value = cartItems.value.filter(item => item.id !== productId)
}

const updateQuantity = (productId, quantity) => {
  const item = cartItems.value.find(item => item.id === productId)
  if (item) {
    item.quantity = quantity
    if (item.quantity <= 0) {
      removeFromCart(productId)
    }
  }
}
</script>