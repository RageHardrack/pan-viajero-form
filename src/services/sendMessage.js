import axios from "axios";

export const sendMessage = (pedido) => {
  const url = `https://api.telegram.org/bot${
    import.meta.env.VITE_APP_BOT
  }/sendMessage`;

  const dateBuilder = (fecha) => {
    const d = new Date(new Date(fecha).getTime() + 1000 * 60 * 60 * 6);

    let months = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];
    let days = [
      "Domingo",
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  let pedidoBody = "";

  for (let item of Object.values(pedido.pedido)) {
    pedidoBody += `* Producto: ${item.title}, Cantidad: ${item.cantidad}`;
    pedidoBody += "\n";
  }

  const mensaje = `¡Has recibido un nuevo Pedido!

Tu cliente ${pedido.nombres} ha solicitado para el día ${dateBuilder(
    pedido.fecha
  )} lo siguiente:

${pedidoBody}
Con un valor total de: S/. ${pedido.total}
  
La dirección es: ${pedido.direccion} y lo puedes contactar al teléfono: ${
    pedido.telefono
  }.`;

  const data = {
    chat_id: import.meta.env.VITE_APP_CHAT_ID,
    text: mensaje,
  };

  const response = axios.post(url, data);
};
