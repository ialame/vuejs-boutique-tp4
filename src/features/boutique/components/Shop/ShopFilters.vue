<script setup lang="ts">
import type { Extension, FiltersInterface, FilterUpdate } from '@/interfaces'

defineProps<{
  filters: FiltersInterface
  nbrOfProducts: number
}>()

const emit = defineEmits<{
  (e: 'updateFilter', filterUpdate: FilterUpdate): void
}>()
</script>

<template>
  <div class="p-20 d-flex flex-column">
    <section class="mb-20">
      <h3 class="mb-10">Recherche</h3>
      <input
        :value="filters.search"
        @input="emit('updateFilter', { search: ($event.target as HTMLInputElement).value })"
        type="text"
        placeholder="Rechercher"
      />
    </section>

    <section class="mb-20">
      <h3 class="mb-10">Trier par prix</h3>
      <div
        class="mb-5"
        v-for="priceRange of [
          [0, 1000],
          [20, 40],
          [40, 60],
          [60, 80],
          [80, 100],
          [100, 1000],
        ] as [number, number][]"
      >
        <input
          :checked="filters.priceRange[0] === priceRange[0]"
          type="radio"
          @input="emit('updateFilter', { priceRange })"
          name="priceRange"
          :id="priceRange[0].toString()"
        />
        <label :for="priceRange[0].toString()">
          {{
            priceRange[0] === 0
              ? 'Tous les prix'
              : priceRange[0] === 100
                ? 'Plus de 100€'
                : `Entre ${priceRange[0]}€ et ${priceRange[1]}€`
          }}
        </label>
      </div>
    </section>

    <section class="mb-20 flex-fill">
      <h3 class="mb-10">Trier par extensions</h3>
      <p
        class="extension"
        :class="{ selected: filters.extension === extension }"
        v-for="extension in ['jungle', 'fossile', 'expedition', 'aquapolis', 'all'] as Extension[]"
        @click="emit('updateFilter', { extension: extension })"
      >
        {{ extension }}
      </p>
    </section>

    <small class="mb-5">
      Nombre de résultats:
      <strong>{{ nbrOfProducts }}</strong>
    </small>
    <button class="btn btn-danger" @click="emit('updateFilter', {})">Supprimer les filtres</button>
  </div>
</template>

<style lang="scss" scoped>
.extension {
  font-size: 14px;
  line-height: 18px;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
}
.selected {
  font-weight: bold;
  text-decoration: underline;
}
</style>
