<script setup lang="ts">
import { useForm, useField } from 'vee-validate';
import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import type { ProductInterface } from '@/interfaces'

const required = { required_error: 'Veuillez renseigner ce champ' };
const validationSchema = toTypedSchema(
  z.object({
    title: z
      .string(required)
      .min(1, { message: 'Le titre doit faire au moins 1 caractère' })
      .max(20, { message: 'Le titre doit faire moins de 20 caractères' }),
    image: z.string(required),
    price: z
      .number(required)
      .min(0, { message: 'Le prix doit être supérieur à 0€' })
      .max(15000, { message: 'Le prix doit être inférieur à 15000€' }),
    description: z
      .string(required)
      .min(10, { message: 'La description doit faire au moins 10 caractères' }),
    extension: z.string(required),
  })
);

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema,
});

const title = useField('title');
const image = useField('image');
const price = useField('price');
const description = useField('description');
const extension = useField('extension');

const emit = defineEmits<{
  (e: 'add-product', product: ProductInterface): void
}>();

const trySubmit = handleSubmit((formValues) => {
  // Générer un ID unique basé sur le timestamp
  const newId = Date.now();
  
  const newProduct = {
    ...formValues,
    id: newId,
  } as ProductInterface;
  
  console.log('Nouveau produit ajouté:', newProduct);
  emit('add-product', newProduct);
  
  // Réinitialiser le formulaire après soumission
  resetForm();
});
</script>

<template>
  <div class="card">
    <h3 class="mb-10">Ajouter un article</h3>
    <form @submit="trySubmit">
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">*Titre</label>
        <input ref="firstInput" v-model="title.value.value" type="text" />
        <small class="form-error" v-if="title.errorMessage.value">{{
          title.errorMessage.value
        }}</small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">*Image (URL)</label>
        <input v-model="image.value.value" type="text" placeholder="src/assets/images/xxx.jpg" />
        <small class="form-error" v-if="image.errorMessage.value">{{
          image.errorMessage.value
        }}</small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">*Prix (€)</label>
        <input v-model="price.value.value" type="number" min="0" />
        <small class="form-error" v-if="price.errorMessage.value">{{
          price.errorMessage.value
        }}</small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">*Description</label>
        <textarea v-model="(description.value.value as string)"></textarea>
        <small class="form-error" v-if="description.errorMessage.value">{{
          description.errorMessage.value
        }}</small>
      </div>
      <div class="d-flex flex-column mb-20">
        <label class="mb-5">*Extension</label>
        <select v-model="extension.value.value">
          <option value="" disabled>Choisissez une extension</option>
          <option value="jungle">Jungle</option>
          <option value="fossile">Fossile</option>
          <option value="expedition">Expedition</option>
          <option value="aquapolis">Aquapolis</option>
        </select>
        <small class="form-error" v-if="extension.errorMessage.value">{{
          extension.errorMessage.value
        }}</small>
      </div>
      <button class="btn btn-primary" :disabled="isSubmitting">
        Sauvegarder
      </button>
    </form>
  </div>
</template>

<style scoped lang="scss">
.card {
  width: 100%;
  max-width: 500px;
}
</style>
