const displayName = (person) => {
  const { first, last } = person;

  console.log(`${first} ${last}`);
};
const person = {
  first: "Elon",
  last: "Musk",
  twitter: "@elonmusk",
  company: "Space X",
};

//displayName(person);

// Luis y Susana

const sales = [
  { item: "PS4 Pro", stock: 3, original: 399.99 },
  { item: "Xbox One X", stock: 1, original: 499.99, discount: 0.1 },
  { item: "Nintendo Switch", stock: 4, original: 299.99 },
  { item: "PS2 Console", stock: 1, original: 299.99, discount: 0.8 },
  { item: "Nintendo 64", stock: 2, original: 199.99, discount: 0.65 },
];

const calculateSalesTotals = (sales) => {
  return sales.map((sale) => {
    sale.sale = sale.discount
      ? sale.original - sale.original * sale.discount
      : sale.original;

    sale.total = sale.sale * sale.stock;

    return sale;
  });
};

console.log(calculateSalesTotals(sales));
