import { connectDB } from "../../utils/db";

export default async function handler(req, res) {
  const { db } = await connectDB();

  if (req.method === "GET") {
    try {
      const cartItems = await db.collection("cart").find({}).toArray();
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items", error });
    }
  } else if (req.method === "POST") {
    const { name, quantity, price, image } = req.body;

    if (!name || !quantity || !price || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const newItem = { name, quantity, price, image };
      const result = await db.collection("cart").insertOne(newItem);
      res.status(201).json({ message: "Item added to cart", item: result.ops[0] });
    } catch (error) {
      res.status(500).json({ message: "Failed to add item to cart", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
