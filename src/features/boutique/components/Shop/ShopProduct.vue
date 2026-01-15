<script setup lang="ts">
import type { ProductInterface } from '@/interfaces/Product.interface'

defineProps<{
  product: ProductInterface;
}>();

const emit = defineEmits<{ (e: 'addProductToCart', productId: number): void; }>();
</script>

<template>
  <div class="product d-flex flex-column">
    <div
      class="product-image"
      :style="{ backgroundImage: `url(${product.image})` }"
    >
    </div>
    <div class="d-flex flex-column p-10">
      <h4>{{ product.title }}</h4>
      <p>{{ product.description }}</p>
      <div class="d-flex flex-row align-items-center">
        <div class="flex-fill">
          Prix: {{ product.price }}€
        </div>
        <button
          @click="emit('addProductToCart', product.id)"
          class="btn btn-primary"
        >
          Ajouter au panier
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.product {
  background-color: #ffffff;
  border: var(--border);
  border-radius: var(--border-radius);
  &-image {
    border-top-right-radius: var(--border-radius);
    border-top-left-radius: var(--border-radius);
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    height: 250px;
  }
}
</style>
