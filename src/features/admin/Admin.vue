<script setup lang="ts">
import ProductForm from './components/ProductForm.vue';
import type { ProductInterface } from '@/interfaces';

// Définir les événements émis par ce composant
const emit = defineEmits<{
  (e: 'add-product', product: ProductInterface): void
}>();

// Transmettre l'événement add-product vers le parent (App.vue)
function handleAddProduct(product: ProductInterface) {
  emit('add-product', product);
}
</script>

<template>
  <div class="admin-container d-flex flex-row justify-content-center align-items-center">
    <ProductForm @add-product="handleAddProduct" />
  </div>
</template>

<style scoped lang="scss">
.admin-container {
  height: 100%;
}
</style>
