<template>
  <div class="mt-2">
    <h4 class="mb-10 text-2xl font-bold text-center">Tu Pedido</h4>

    <table class="w-full table-auto">
      <thead>
        <tr class="border-b-2 border-primary">
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
          <th scope="row" colspan="4" v-if="Object.keys(items).length === 0">
            No hay pedidos...
          </th>
          <Footer v-else />
        </tr>
      </tfoot>
    </table>
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

    const items = computed(() => store.state.carrito);

    return { items };
  },
};
</script>
