<template>
  <tr class="w-full h-10 text-center align-middle">
    <th scope="row">{{ item.title }}</th>
    <td>{{ item.cantidad }}</td>

    <td class="flex items-center h-10 justify-evenly">
      <button
        class="px-4 font-bold text-center bg-blue-500 rounded-full"
        @click="aumentar(item.id)"
      >
        +
      </button>
      <button
        class="px-4 font-bold text-center bg-red-500 rounded-full"
        @click="disminuir(item.id)"
      >
        -
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
