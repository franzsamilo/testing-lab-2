import express, { Request, Response } from "express";
import poggies from "../../db/poggies";

const router = express.Router();

router.post("/create", async (req: Request, res: Response) => {
  try {
    const { pogs_name, ticker_symbol, price, color, user_id } = req.body;

    if (!pogs_name || !ticker_symbol || !price || !color || !user_id) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    if (typeof price !== "number") {
      return res.status(401).json({ error: "Invalid data types" });
    }

    await poggies.query(
      "INSERT INTO pogs (pogs_name, ticker_symbol, price, color, user_id) VALUES ($1, $2, $3, $4, $5)",
      [pogs_name, ticker_symbol, price, color, 0]
    );

    res.status(201).json({ message: "Pogs created successfully" });
  } catch (error) {
    console.error("Error creating pogs:", error);
    res.status(500).json({ error: "Failed to create pogs" });
  }
});

export default router;
