<template>
  <tr class="w-full h-10 text-sm text-center align-middle md:text-base">
    <th scope="row">{{ item.title }}</th>
    <td>{{ item.cantidad }}</td>

    <td class="flex items-center h-10 justify-evenly">
      <button
        class="w-6 h-6 font-bold text-center bg-red-500 rounded-full"
        @click="disminuir(item.id)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M20 12H4"
          />
        </svg>
      </button>

      <button
        class="w-6 h-6 font-bold text-center bg-blue-500 rounded-full"
        @click="aumentar(item.id)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-4 h-4 mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
    </td>

    <td>S/. {{ item.precio * item.cantidad }}</td>
  </tr>
</template>

<script>
import { useStore } from "vuex";

export default {
  props: {
    item: { type: Object },
  },
  setup() {
    const store = useStore();

    const aumentar = (id) => {
      store.commit("aumentar", id);
    };

    const disminuir = (id) => {
      store.commit("disminuir", id);
    };

    return { aumentar, disminuir };
  },
};
</script>
