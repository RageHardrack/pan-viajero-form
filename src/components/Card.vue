// :class="{ 'filter grayscale': producto.stock == 0 }"
<template>
  <div class="relative card" v-if="producto">
    <img
      :src="producto.thumbnailUrl"
      :alt="`Foto-${producto.title}`"
      class="mb-2 card-img"
    />

    <div class="overlay-card" v-if="producto.stock == 0"></div>

    <div
      v-if="producto.stock == 0"
      class="absolute z-10 text-2xl font-bold text-red-500 transform -translate-x-1/2 -translate-y-1/2  md:text-6xl top-1/2 left-1/2"
    >
      Agotado
    </div>

    <div>
      <h5 class="card-title">{{ producto.title }}</h5>
      <div class="font-bold text-gray-200">
        S/. <span>{{ producto.precio }}</span>
      </div>
    </div>

    <div class="hidden card-text md:flex">
      <p>{{ producto.description }}</p>
    </div>

    <div class="flex justify-around my-4">
      <label
        for="cantidadProductos"
        class="text-xs font-bold text-white md:text-base"
        >Cantidad:
      </label>

      <select
        v-model.number="cantidadProductos"
        class="block w-10 text-center text-black rounded md:w-14"
        id="cantidadProductos"
      >
        <option v-for="item in producto.stock" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
    </div>

    <button
      v-if="producto.stock == 0"
      @click="agregar(producto)"
      disabled
      class="cursor-default btn"
    >
      Añadir
    </button>

    <button v-else @click="agregar(producto)" class="btn">Añadir</button>
  </div>
</template>

<script>
import { ref, computed } from "vue";
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
