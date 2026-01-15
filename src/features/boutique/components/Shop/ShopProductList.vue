<script setup lang="ts">
import ShopProduct from './ShopProduct.vue';
import type { ProductInterface } from '@/interfaces/Product.interface'

defineProps<{
  products: ProductInterface[];
}>();

const emit = defineEmits<{
  (e: 'addProductToCart', productId: number): void;
}>();
</script>

<template>
  <div class="grid p-20">
    <ShopProduct
      @add-product-to-cart="emit('addProductToCart', $event)"
      v-for="product of products"
      :product="product"
      :key="product.id"
    />
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/mixins' as m;
.grid {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 400px;
  gap: 20px;
  @include m.md {
    grid-template-columns: 1fr 1fr;
  }
  @include m.lg {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @include m.xl {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}

</style>
