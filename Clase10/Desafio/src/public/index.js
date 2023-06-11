const socket = io();

socket.on("products", (data) => {
  const divProducts = document.getElementById("products");
  let products = "";
  data.forEach((product) => {
    products += `<p>${product.title} --- <button onClick=deleteProduct(${product.id})>Delete</button></p>`;
  });

  divProducts.innerHTML = products;
});

const deleteProduct = (pid) => {
  socket.emit("deleteProduct", String(pid));
};
