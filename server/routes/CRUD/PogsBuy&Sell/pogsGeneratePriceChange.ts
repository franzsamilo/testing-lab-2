import express, { Request, Response } from "express";
import poggies from "../../../db/poggies";

const router = express.Router();

router.post(
  "/generate-price-change/:pogs_id",
  async (req: Request, res: Response) => {
    try {
      const pogs_id = req.params.pogs_id;
      const price_change = Math.random() * 10 - 5;

      if (
        !pogs_id ||
        (price_change !== undefined && typeof price_change !== "number")
      ) {
        return res.status(400).json({ error: "Invalid inputs" });
      }

      await poggies.query(
        "UPDATE pogs_main SET price_change = $1 WHERE pogs_id = $2",
        [price_change, pogs_id]
      );

      await poggies.query(
        "INSERT INTO pogs_price_history (pogs_id, price_change) VALUES ($1, $2)",
        [pogs_id, price_change]
      );

      res.status(200).json({
        message: "Price change updated and recorded successfully",
        price_change,
      });
    } catch (error) {
      console.error("Error updating and recording price change:", error);
      res
        .status(500)
        .json({ error: "Failed to update and record price change" });
    }
  }
);

export default router;
