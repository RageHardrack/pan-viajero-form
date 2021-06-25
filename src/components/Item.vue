<template>
  <tr class="w-full h-10 text-center place-content-center">
    <th scope="row">{{ item.title }}</th>
    <td>{{ item.cantidad }}</td>

    <td>
      <button @click="aumentar(item.id)">+</button>
      <button @click="disminuir(item.id)">-</button>
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
