//sincronismo = operacion bloqueante
//asinccronismo = operacion no bloqueante

const temporizador = (cb) => {
  setTimeout(cb, 2000); //ejecuta luego de 2 segundos
  setInterval(cb, 1500); //ejecuta cb cada 1.5 segundos
};

const operacion = () => console.log("Ejecutar operacion");

console.log("Iniciar proceso");
temporizador(operacion);
console.log("Finalizar proceso");
