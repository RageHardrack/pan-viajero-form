<template>
  <div class="card">
    <img
      :src="producto.thumbnailUrl"
      :alt="`Foto-${producto.title}`"
      class="mb-2 card-img"
    />

    <div>
      <h5 class="card-title">{{ producto.title }}</h5>
      <div class="font-bold text-gray-200">
        S/. <span>{{ producto.precio }}</span>
      </div>
    </div>

    <div class="card-text">
      <p>{{ producto.description }}</p>
    </div>

    <div class="flex justify-around my-4">
      <p class="font-bold text-white">Cantidad:</p>
      <input
        type="number"
        min="0"
        :max="producto.stock"
        class="block text-center text-black w-14"
        v-model.number="cantidadProductos"
      />
    </div>

    <button @click="agregar(producto)" class="btn">Añadir</button>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    producto: {
      type: Object,
    },
  },
  setup() {
    const store = useStore();
    const cantidadProductos = ref(1);

    const agregar = (producto) => {
      producto.cantidad = cantidadProductos.value;
      store.dispatch("agregarAlCarrito", producto);
    };

    return { agregar, cantidadProductos };
  },
};
</script>
