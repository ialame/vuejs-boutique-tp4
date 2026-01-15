<script setup lang="ts">
import data from '@/data/product'
import type { Page, ProductInterface } from '@/interfaces'
import { reactive, type Component as C } from 'vue'

import TheHeader from './components/Header.vue'
import TheFooter from './components/Footer.vue'
import Boutique from '@/features/boutique/Boutique.vue'
import Admin from '@/features/admin/Admin.vue'

const state = reactive<{
  products: ProductInterface[]
  page: Page
}>({
  products: data,
  page: 'Boutique',
})

const pages: { [s: string]: C } = {
  Boutique,
  Admin
}

function navigate(page: Page): void {
  state.page = page;
}

function addProduct(product: ProductInterface): void {
  state.products.push(product);
}
</script>

<template>
  <div class="app-container">
    <TheHeader @navigate="navigate" :products="state.products" :page="state.page" class="header" />
    <Component 
      :is="pages[state.page]" 
      @add-product="addProduct" 
      :products="state.products"
    />
    <TheFooter class="footer" />
  </div>
</template>

<style lang="scss">
@use '@/assets/scss/base.scss';

.app-container {
  min-height: 100vh;
  display: grid;
  grid-template-areas: 'header' 'app-content' 'footer';
  grid-template-rows: 48px auto 48px;
}

.header {
  grid-area: header;
}
.app-content {
  grid-area: app-content;
}
.footer {
  grid-area: footer;
}
</style>
