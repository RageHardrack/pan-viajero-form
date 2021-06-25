<template>
  <header>
    <TheNavbar />
  </header>

  <main
    class="container grid min-h-screen grid-cols-1 gap-8 px-4 mx-auto my-10  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    <Card
      v-for="producto of productos"
      :key="producto.id"
      :producto="producto"
    />
  </main>

  <footer>
    <transition name="carrito" appear>
      <div
        v-if="showFooter"
        class="fixed bottom-0 w-full py-10 text-white bg-opacity-95 bg-primary"
      >
        <Carrito />
      </div>

      <button
        @click="mostrarFooter"
        v-else
        class="fixed p-4 font-bold text-white rounded-full  md:p-6 bottom-2 right-2 bg-secondary md:bottom-10 md:right-10"
      >
        Comprar
      </button>
    </transition>
  </footer>
</template>

<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";

// Componentes
import TheNavbar from "./components/TheNavbar.vue";
import Card from "./components/Card.vue";
import Carrito from "./components/Carrito.vue";

export default {
  name: "App",
  components: { TheNavbar, Card, Carrito },
  setup() {
    const store = useStore();

    onMounted(async () => {
      await store.dispatch("fetchData");
    });

    const showFooter = computed(() => store.state.showFooter);

    const mostrarFooter = () => {
      store.dispatch("mostrarCarrito");
    };

    const productos = computed(() => store.state.productos);
    // const carrito = computed(() => store.state.carrito);

    return { productos, showFooter, mostrarFooter };
  },
};
</script>

<style scoped>
.carrito-enter-from,
.carrito-leave-to {
  /* transform: translateY(400px); */
  opacity: 0;
}

/* .carrito-leave,
.carrito-enter-to {
  opacity: 1;
} */

.carrito-enter-active,
.carrito-leave-active {
  transition: opacity 0.3s;
}
</style>
