import { createStore } from "vuex";
import axios from "axios";

import { parseData } from "../services/parseData";

const googleSheetUrl = `https://spreadsheets.google.com/feeds/list/${
  import.meta.env.VITE_APP_SHEET_ID
}/1/public/values?alt=json`;

const initialCarrito = JSON.parse(localStorage.getItem("carrito"));

export default createStore({
  state: {
    productos: [],
    carrito: initialCarrito ? initialCarrito : {},
    showFooter: false,
    showForm: false,
    showMsg: false,
  },
  mutations: {
    setProductos(state, payload) {
      state.productos = payload;
    },

    setCarrito(state, payload) {
      state.carrito[payload.id] = payload;
      localStorage.setItem("carrito", JSON.stringify(state.carrito));
    },

    vaciarCarrito(state) {
      state.carrito = {};
      localStorage.removeItem("carrito");
    },

    aumentar(state, payload) {
      if (state.carrito[payload].cantidad < state.carrito[payload].stock) {
        state.carrito[payload].cantidad += 1;
        localStorage.setItem("carrito", JSON.stringify(state.carrito));
      }
    },

    disminuir(state, payload) {
      state.carrito[payload].cantidad -= 1;
      if (state.carrito[payload].cantidad === 0) {
        delete state.carrito[payload];
        localStorage.setItem("carrito", JSON.stringify(state.carrito));
      }
    },

    changeFooter(state) {
      state.showFooter = !state.showFooter;
    },

    changeForm(state) {
      state.showForm = !state.showForm;
    },

    changeMsg(state) {
      state.showMsg = !state.showMsg;
    },
  },
  actions: {
    async fetchData({ commit }) {
      try {
        const response = await axios.get(googleSheetUrl);
        const data = parseData(response.data.feed.entry);

        commit("setProductos", data);
      } catch (error) {
        console.error(`Error ocurrido desde la Store: ${error.message}`);
      }
    },

    agregarAlCarrito({ commit, state }, producto) {
      state.carrito.hasOwnProperty(producto.id)
        ? (producto.cantidad =
            state.carrito[producto.id].cantidad + producto.cantidad)
        : producto.cantidad;

      commit("setCarrito", producto);
    },

    mostrarCarrito({ commit }) {
      commit("changeFooter");
    },

    mostrarForm({ commit }) {
      commit("changeForm");
    },

    mostrarMsg({ commit }) {
      commit("changeMsg");
    },
  },
  getters: {
    totalPrecio(state) {
      return Object.values(state.carrito).reduce(
        (acc, { cantidad, precio }) => acc + cantidad * precio,
        0
      );
    },

    productosEnCarrito(state) {
      return Object.keys(state.carrito).length;
    },
  },
});
