let is_stock = true;

const production = (timeout, task) => {
  return new Promise((resolve, reject) => {
    if (is_stock) {
      setTimeout(() => {
        resolve(task);
      }, timeout);
    } else {
      reject("No stock");
    }
  });
};

production()
  .then(() =>
    production(
      0,
      console.log("Orden recibida, iniciando la produccion de mate...")
    )
  )
  .then(() => production(2000, console.log("Calentando el agua...")))
  .then(() => production(3000, console.log("Poniendo la yerba en el mate...")));
