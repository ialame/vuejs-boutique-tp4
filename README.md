# PokeShop Frontend - Boutique de Cartes Pokémon

Application Vue.js 3 pour une boutique de cartes Pokémon.

## 🚀 Installation et démarrage

```bash
# Installation des dépendances
npm install

# Démarrage en mode développement
npm run dev
```

L'application démarre sur **http://localhost:5173**

## 📁 Structure du projet

```
src/
├── assets/
│   ├── scss/
│   │   ├── base.scss
│   │   └── debug.scss
│   └── main.css
├── components/
│   ├── Header.vue
│   └── Footer.vue
├── data/
│   ├── filters.ts
│   └── product.ts
├── features/
│   ├── admin/
│   │   ├── Admin.vue          ← CORRIGÉ
│   │   └── components/
│   │       └── ProductForm.vue
│   └── boutique/
│       ├── Boutique.vue
│       └── components/
│           ├── Cart/
│           │   ├── Cart.vue
│           │   ├── CartProduct.vue
│           │   └── CartProductList.vue
│           └── Shop/
│               ├── Shop.vue
│               ├── ShopFilters.vue
│               ├── ShopProduct.vue
│               └── ShopProductList.vue
├── interfaces/
│   ├── Filters.interface.ts
│   ├── Product.interface.ts
│   ├── type.ts
│   └── index.ts
├── App.vue
└── main.ts
```

## 📦 Technologies

- Vue.js 3 (Composition API)
- TypeScript
- VeeValidate + Zod (validation des formulaires)
- SCSS
- Vite

## 🔄 Flux de données pour l'ajout de produit

```
ProductForm.vue
    │
    │ emit('add-product', product)
    ▼
Admin.vue (CORRIGÉ)
    │
    │ emit('add-product', product)
    ▼
App.vue
    │
    │ state.products.push(product)
    ▼
Liste des produits mise à jour
```
# vuejs-boutique-tp4
# vuejs-boutique-tp4
