<template>
  <div class="grid w-full grid-cols-4 text-center gap-x-4">
    <div class="grid grid-cols-2 col-span-3 gap-x-4">
      <button
        class="px-4 py-2 mx-auto text-xs font-bold text-white bg-red-500 rounded-lg  md:w-1/2 md:px-6 md:text-base"
        @click="vaciar"
      >
        Vaciar
      </button>

      <button
        class="px-4 py-2 mx-auto text-xs font-bold text-white bg-green-500 rounded-lg  md:w-1/2 md:px-6 md:text-base"
        @click="comprar"
      >
        Realizar Compra
      </button>
    </div>

    <div class="font-bold">
      S/. <span>{{ totalPrecio }}</span>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();

    const totalPrecio = computed(() => store.getters.totalPrecio);

    const vaciar = () => {
      store.commit("vaciarCarrito");
    };

    const comprar = () => {
      store.dispatch("mostrarCarrito");
      store.dispatch("mostrarForm");
    };

    return { totalPrecio, vaciar, comprar };
  },
};
</script>
