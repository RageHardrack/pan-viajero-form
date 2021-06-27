export const parseData = (entries) => {
  let productos = [];

  entries.forEach((entry) => {
    let producto = {
      id: entry.gsx$id.$t,
      title: entry.gsx$title.$t,
      description: entry.gsx$description.$t,
      precio: entry.gsx$precio.$t,
      thumbnailUrl: entry.gsx$thumbnailurl.$t,
      stock: entry.gsx$stock.$t,
    };

    productos.push(producto);
  });

  return productos;
};
