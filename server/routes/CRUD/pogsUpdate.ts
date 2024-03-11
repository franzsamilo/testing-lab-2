import express, { Request, Response } from "express";
import poggies from "../../db/poggies";

const router = express.Router();

router.put("/update/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { pogs_name, ticker_symbol, price, color, user_id } = req.body;

  try {
    await poggies.query(
      "UPDATE pogs SET pogs_name = $1, ticker_symbol = $2, price = $3, color = $4, user_id = $5 WHERE pogs_id = $6",
      [pogs_name, ticker_symbol, price, color, user_id, id]
    );
    res.status(200).json({ message: "Pog updated successfully" });
  } catch (error) {
    console.error("Error updating Pog:", error);
    res.status(500).json({ error: "Failed to update Pog" });
  }
});

export default router;
