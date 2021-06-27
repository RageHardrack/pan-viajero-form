<template>
  <div class="card">
    <img
      :src="producto.thumbnailUrl"
      :alt="`Foto-${producto.title}`"
      class="mb-2 card-img"
    />

    <div class="flex flex-col justify-between">
      <h5 class="card-title">{{ producto.title }}</h5>

      <div class="card-text">
        <p>{{ producto.description }}</p>
        <br />
        <p class="font-bold">
          S/. <span>{{ producto.precio }}</span>
        </p>
      </div>

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
