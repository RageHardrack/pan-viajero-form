<template>
  <div class="card">
    <img
      :src="producto.thumbnailUrl"
      :alt="`Foto-${producto.title}`"
      class="card-img"
    />

    <div class="py-4">
      <h5 class="card-title">{{ producto.title }}</h5>
      <p class="card-text">{{ producto.description }}</p>
      <p class="card-text">
        S/. <span>{{ producto.precio }}</span>
      </p>

      <button @click="agregar(producto)" class="btn">Añadir</button>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";

export default {
  props: {
    producto: {
      type: Object,
    },
  },
  setup() {
    const store = useStore();

    const agregar = (producto) => {
      store.dispatch("agregarAlCarrito", producto);
      console.log(producto.cantidad);
    };

    return { agregar };
  },
};
</script>
