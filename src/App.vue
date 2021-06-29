<template>
  <header>
    <TheNavbar />
  </header>

  <main
    class="container grid min-h-screen grid-cols-2 gap-8 px-4 mx-auto my-10  sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
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

      <div v-else>
        <div
          v-if="totalProductos !== 0"
          class="fixed z-10 w-6 h-6 font-bold text-center text-white transition duration-300 transform bg-red-500 rounded-full  md:text-lg md:w-8 md:h-8 md:bottom-24 md:right-10 bottom-12 right-1"
        >
          {{ totalProductos }}
        </div>

        <button
          @click="mostrarFooter"
          class="fixed font-bold text-white duration-200 transform rounded-full  w-14 h-14 md:w-20 md:h-20 bottom-2 right-2 bg-secondary md:bottom-10 md:right-10 hover:opacity-90"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-6 h-6 mx-auto md:w-10 md:h-10"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"
            />
          </svg>
        </button>
      </div>
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
    const totalProductos = computed(() => store.getters.productosEnCarrito);

    return { productos, showFooter, mostrarFooter, totalProductos };
  },
};
</script>

<style scoped>
.carrito-enter-from,
.carrito-leave-to {
  opacity: 0;
}

.carrito-enter-active,
.carrito-leave-active {
  transition: opacity 0.3s;
}
</style>
