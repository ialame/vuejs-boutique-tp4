<script setup lang="ts">
import CartProductList from './CartProductList.vue';
import type { ProductInterface } from '@/interfaces/Product.interface'
import { computed } from 'vue'

const props = defineProps<{
  cart: ProductInterface[];
}>();

const emit = defineEmits<{
  (e: 'removeProductFromCart', productId: number): void;
}>();

const totalPrice = computed(() =>
  props.cart.reduce((acc, product) => acc + product.price * (product.quantity ? product.quantity : 0), 0)
);
</script>

<template>
  <div class="p-20 d-flex flex-column">
    <CartProductList
      class="flex-fill"
      :cart="cart"
      @remove-product-from-cart="emit('removeProductFromCart', $event)"
    />
    <button class="btn btn-success">Commander ({{ totalPrice }}€)</button>
  </div>
</template>

<style lang="scss" scoped></style>
