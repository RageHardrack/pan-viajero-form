<template>
  <div
    class="fixed z-20 w-11/12 p-4 rounded-lg md:w-1/3 center-modal bg-primary"
  >
    <button
      @click="cancelarPedido"
      class="absolute w-10 h-10 text-2xl font-bold text-center text-white rounded-full  -right-4 -top-4 bg-secondary"
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

    <div class="p-2 bg-white rounded-lg">
      <h3 class="text-2xl font-bold text-center text-primary">
        Datos Personales
      </h3>

      <form @submit.prevent="handleSubmit" class="flex flex-col p-4">
        <div class="flex flex-col mb-4">
          <label for="fecha" class="text-sm font-bold md:text-base text-primary"
            >¿Cuándo lo deseas?
            <span class="font-bold text-red-500">*</span></label
          >
          <input
            type="date"
            id="fecha"
            name="fecha"
            class="input"
            required
            placeholder="Selecciona una fecha..."
            v-model="nuevoPedido.fecha"
          />
        </div>

        <div class="flex flex-col mb-4">
          <label for="nombres" class="font-bold text-primary">
            Nombres y apellidos <span class="font-bold text-red-500">*</span>
          </label>
          <input
            type="text"
            id="nombres"
            name="nombres"
            required
            class="input"
            v-model="nuevoPedido.nombres"
          />
        </div>

        <div class="flex flex-col mb-4">
          <label for="telefono" class="font-bold text-primary">
            Teléfono <span class="font-bold text-red-500">*</span>
          </label>
          <input
            type="text"
            id="telefono"
            name="telefono"
            required
            class="input"
            v-model="nuevoPedido.telefono"
          />
          <p class="text-xs">Te escribiremos a este número</p>
        </div>

        <div class="flex flex-col mb-4">
          <label for="direccion" class="font-bold text-primary">
            Dirección <span class="font-bold text-red-500">*</span>
          </label>
          <input
            type="text"
            id="direccion"
            name="direccion"
            required
            class="input"
            v-model="nuevoPedido.direccion"
          />
        </div>

        <button type="submit" class="btn">Enviar</button>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import { sendMessage } from "../services/sendMessage";

export default {
  props: {},
  setup() {
    const store = useStore();
    const nuevoPedido = reactive({
      fecha: "",
      nombres: "",
      telefono: "",
      direccion: "",
      pedido: {},
      total: 0,
    });

    const carrito = JSON.parse(localStorage.getItem("carrito"));

    const cancelarPedido = () => {
      store.dispatch("mostrarForm");
    };

    const handleSubmit = () => {
      if (
        nuevoPedido.nombres.trim() === "" ||
        nuevoPedido.telefono.trim() === "" ||
        nuevoPedido.direccion.trim() === ""
      ) {
        return;
      }

      nuevoPedido.pedido = { ...carrito };
      nuevoPedido.total = Object.values(carrito).reduce(
        (acc, { cantidad, precio }) => acc + cantidad * precio,
        0
      );
      console.log(nuevoPedido);
      sendMessage(nuevoPedido);

      store.commit("vaciarCarrito");
      store.dispatch("mostrarForm");
      store.dispatch("mostrarMsg");
    };

    return { cancelarPedido, nuevoPedido, handleSubmit };
  },
};
</script>
