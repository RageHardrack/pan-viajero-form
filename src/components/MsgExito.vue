<template>
  <div
    class="fixed z-20 w-11/12 p-4 rounded-lg md:w-1/3 center-modal bg-primary"
  >
    <div class="p-4 mb-4 bg-white rounded-lg">
      <h3 class="mb-4 text-lg font-bold text-center md:text-2xl">
        ¡Hemos recibido tu pedido con éxito!
      </h3>

      <p class="mb-4">Te estaremos contactando para coordinar la entrega.</p>

      <h3 class="text-center">¡Muchas gracias por tu compra!</h3>
    </div>

    <div class="flex justify-center">
      <button @click="cerrarModal" class="w-1/2 btn">Ok</button>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const cerrarModal = () => store.dispatch("mostrarMsg");

    return { cerrarModal };
  },
};
</script>
