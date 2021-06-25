<template>
  <div class="relative mt-2">
    <button
      @click="mostrarFooter"
      class="absolute px-2 text-2xl font-bold text-white rounded-full  -top-16 right-5 bg-secondary"
    >
      x
    </button>
    <h4 class="mb-10 text-2xl font-bold text-center">Tu Pedido</h4>

    <table class="w-full table-auto">
      <thead>
        <tr class="h-20">
          <th scope="col" class="text-lg font-bold">Producto</th>
          <th scope="col" class="text-lg font-bold">Cantidad</th>
          <th scope="col" class="text-lg font-bold">Acción</th>
          <th scope="col" class="text-lg font-bold">Total</th>
        </tr>
      </thead>

      <tbody>
        <Item v-for="item in items" :key="item.id" :item="item" />
      </tbody>

      <tfoot>
        <tr>
          <th
            scope="row"
            colspan="4"
            class="h-20"
            v-if="Object.keys(items).length === 0"
          >
            No hay pedidos...
          </th>
          <Footer v-else />
        </tr>
      </tfoot>
    </table>

    <div class="p-4 text-center">
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
