import { createOrder } from "/util/firebase.config";

export default async function handler(req, res) {
  const { method } = req;
  if (method === "GET") {
    try {
      const orders = [];
      res.status(200).json(orders);
    } catch (error) {}
  } else if (method === "POST") {
    try {
      const order = req.body;
      await createOrder(order);
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}
