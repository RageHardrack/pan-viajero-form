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
        <option v-for="item in stock" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
    </div>

    <button @click="agregar(producto)" class="btn" :disabled="productoAnadido">
      Añadir
    </button>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";

const stock = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default {
  props: {
    producto: {
      type: Object,
    },
  },
  setup() {
    const store = useStore();
    const cantidadProductos = ref(1);
    const productoAnadido = ref(false);

    const agregar = (producto) => {
      producto.cantidad = cantidadProductos.value;
      store.dispatch("agregarAlCarrito", producto);
      productoAnadido.value = true;
    };

    return { agregar, cantidadProductos, productoAnadido, stock };
  },
};
</script>
