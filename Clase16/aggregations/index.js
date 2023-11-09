import mongoose from "mongoose";
import orderModel from "./order.model.js";

try {
  await mongoose.connect("mongodb://localhost:27017", { dbName: "clase17" });
  console.log("DB Connected!");

  // const result = await orderModel.insertMany([
  //   { name: "Pepperoni", size: "small", price: 19, quantity: 10 },
  //   { name: "Pepperoni", size: "small", price: 19, quantity: 10 },
  //   { name: "Pepperoni", size: "small", price: 19, quantity: 10 },
  //   { name: "Pepperoni", size: "small", price: 19, quantity: 10 },
  //   { name: "Pepperoni", size: "medium", price: 19, quantity: 10 },
  // ]);

  const orders = await orderModel.aggregate([
    { $match: { size: "medium" } },
    {
      $group: { _id: "name", totalQty: { $sum: "$quantity" } },
    },
    { $sort: { _id: 1 } },
    {
      $group: {
        _id: 1, //genera id numerico
        orders: { $push: "$$ROOT" },
      },
    },
    {
      $project: {
        _id: 0, //no genera id numerico
        orders: "$orders",
      },
    },
    {
      $merge: {
        into: "reports",
      },
    },
  ]);
  console.log(orders);
} catch (error) {
  console.log(error.message);
}
