<script setup lang="ts">
import Shop from '@/features/boutique/components/Shop/Shop.vue'
import Cart from '@/features/boutique/components/Cart/Cart.vue'
import { computed, reactive } from 'vue'
import type { ProductInterface } from '@/interfaces/Product.interface'
import type { FiltersInterface, FilterUpdate } from '@/interfaces'
import { DEFAULT_FILTERS } from '@/data/filters'

const state = reactive<{
  cart: ProductInterface[]
  filters: FiltersInterface
}>({
  cart: [],
  filters: { ...DEFAULT_FILTERS },
})

const props = defineProps<{
  products: ProductInterface[];
}>();

function ajouterAuPanier(productId: number): void {
  const product = props.products.find((product) => product.id === productId)
  if (product) {
    const productInCart = state.cart.find((product) => product.id === productId)
    if (productInCart && productInCart.quantity) {
      productInCart.quantity++
    } else {
      state.cart.push({ ...product, quantity: 1 })
    }
  }
}

function supprimerDuPanier(productId: number): void {
  const productFromCart = state.cart.find((product) => product.id === productId)
  if (productFromCart?.quantity === 1) {
    state.cart = state.cart.filter((product) => product.id !== productId)
  } else if (productFromCart && productFromCart.quantity) {
    productFromCart.quantity--
  }
}

const cartEmpty = computed(() => state.cart.length === 0)

function updateFilter(filterUpdate: FilterUpdate) {
  if (filterUpdate.search !== undefined) state.filters.search = filterUpdate.search
  else if (filterUpdate.priceRange) state.filters.priceRange = filterUpdate.priceRange
  else if (filterUpdate.extension) state.filters.extension = filterUpdate.extension
  else state.filters = { ...DEFAULT_FILTERS }
}

const filteredProducts = computed(() => {
  return props.products.filter((product) => {
    return (
      product.title.toLocaleLowerCase().startsWith(state.filters.search.toLocaleLowerCase()) &&
      product.price >= state.filters.priceRange[0] &&
      product.price <= state.filters.priceRange[1] &&
      (product.extension === state.filters.extension || state.filters.extension === 'all')
    )
  })
})
</script>

<template>
  <div
    class="boutique-container"
    :class="{ gridEmpty: cartEmpty }"
  >
    <Shop
      @update-filter="updateFilter"
      :products="filteredProducts"
      :filters="state.filters"
      @add-product-to-cart="ajouterAuPanier"
      class="shop"
    />
    <Cart
      v-if="!cartEmpty"
      :cart="state.cart"
      class="cart"
      @remove-product-from-cart="supprimerDuPanier"
    />
  </div>
</template>

<style lang="scss">
@use '@/assets/scss/base' as *;
@use '@/assets/scss/debug' as *;

.cart {
  border-left: var(--border);
  background-color: white;
}
.boutique-container {
  display: grid;
  grid-template-columns: 75% 25%;
}
.gridEmpty {
  grid-template-columns: 100%;
}
</style>
