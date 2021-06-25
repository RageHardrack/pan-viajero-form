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

  <footer
    class="fixed bottom-0 w-full py-10 text-white bg-opacity-90 bg-primary"
  >
    <Carrito />
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

    const productos = computed(() => store.state.productos);
    // const carrito = computed(() => store.state.carrito);

    return { productos };
  },
};
</script>
