const products = [
  {
    id: 30,
    name: "Agua Con Gas 1,5 lts",
    stock: 86,
    cost: 45,
  },
  {
    id: 29,
    name: "Agua Sin Gas 1,5 lts",
    stock: 100,
    cost: 140,
  },
  {
    id: 76,
    name: "Alambrado Chardonnay 750 ml",
    stock: 92,
    cost: 575,
  },
];

const getProductsAfterDelay = (product, time) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(product);
    }, time);
  });
};

const getProducts = (time) => {
  let delay = time;
  products.forEach((product, index) => {
    getProductsAfterDelay(product, delay).then((product) =>
      console.log(product)
    );
    delay += time;
  });
};

getProducts(2000);
