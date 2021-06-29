<template>
  <th scope="row" colspan="3" class="h-20 text-center">
    <div class="flex justify-evenly">
      <button
        class="px-6 py-2 text-sm font-bold text-white bg-red-500 rounded-lg  md:text-base"
        @click="vaciar"
      >
        Vaciar
      </button>

      <button
        class="px-6 py-2 text-sm font-bold text-white bg-green-500 rounded-lg  md:text-base"
        @click="vaciar"
      >
        Realizar Compra
      </button>
    </div>
  </th>

  <td class="font-bold text-center">
    S/. <span>{{ totalPrecio }}</span>
  </td>
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
    return { totalPrecio, vaciar };
  },
};
</script>
