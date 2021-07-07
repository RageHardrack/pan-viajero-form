<template>
  <div class="relative mt-2">
    <button
      @click="mostrarFooter"
      class="absolute w-10 h-10 text-2xl font-bold text-center text-white rounded-full  -top-16 right-5 bg-secondary"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-8 h-8 mx-auto"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <h4 class="mb-10 text-2xl font-bold text-center">Tu Pedido</h4>

    <div class="w-full px-4 py-4 md:px-10">
      <div class="grid grid-cols-4 font-bold text-center gap-x-4">
        <div class="md:text-lg">Producto</div>
        <div class="md:text-lg">Cantidad</div>
        <div class="md:text-lg">Acción</div>
        <div class="md:text-lg">Total</div>
      </div>

      <div class="my-6 overflow-y-scroll max-h-60 md:max-h-80">
        <Item v-for="item in items" :key="item.id" :item="item" />
      </div>

      <div
        class="flex items-center justify-center text-lg font-bold md:text-2xl"
      >
        <h3 v-if="Object.keys(items).length === 0">No hay pedidos...</h3>

        <Footer v-else />
      </div>
    </div>

    <div v-if="Object.keys(items).length !== 0" class="p-4 text-center">
      <h4 class="mb-2 text-xl font-bold">Importante</h4>
      <p>Subtotal no incluye delivery, coordinar al momento del pago.</p>
      <p>Sabores de mermeladas a consultar.</p>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import Item from "./Item.vue";
import Footer from "./Footer.vue";

export default {
  components: { Item, Footer },
  setup() {
    const store = useStore();

    const mostrarFooter = () => {
      store.dispatch("mostrarCarrito");
    };

    const items = computed(() => store.state.carrito);

    return { items, mostrarFooter };
  },
};
</script>
