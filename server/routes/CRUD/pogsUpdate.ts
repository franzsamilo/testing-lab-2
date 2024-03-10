import express, { Request, Response } from "express";
import poggies from "../../db/poggies";

const router = express.Router();

router.put("/update/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedPog = req.body;

    const updatedPogs = await poggies.query(
      "UPDATE pogs SET pogs_name = $1, ticker_symbol = $2, price = $3, color = $4, user_id = $5 WHERE pogs_id = $6 ",
      [
        updatedPog.pogs_name,
        updatedPog.ticker_symbol,
        updatedPog.price,
        updatedPog.color,
        updatedPog.user_id,
        id
      ]
    );

    if (updatedPogs.length > 0) {
      res.status(200).json(updatedPogs[0]);
    } else {
      res.status(404).json({ error: "Pog not found" });
    }
  } catch (error) {
    console.error("Error updating pog:", error);
    res.status(500).json({ error: "Failed to update pog" });
  }
});
  


export default router;