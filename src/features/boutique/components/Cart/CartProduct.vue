<script setup lang="ts">
import type { ProductInterface } from '@/interfaces/Product.interface'

defineProps<{
  product: ProductInterface;
}>();

const emit = defineEmits<{
  (e: 'removeProductFromCart', productId: number): void;
}>();
</script>

<template>
  <div class="mb-10 p-10 d-flex flex-row align-items-center product">
    <strong class="mr-10">{{ product.title }}</strong>
    <span class="mr-10">x {{ product.quantity }}</span>
    <span class="mr-10 flex-fill">Prix : {{ product.price }}€</span>

    <button
      class="btn btn-danger"
      @click="emit('removeProductFromCart', product.id)"
    >
      Supprimer
    </button>
  </div>
</template>

<style lang="scss" scoped>
.product {
  border: var(--border);
  border-radius: var(--border-radius);
  background-color: var(--gray-1);
}
</style>
