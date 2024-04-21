import express, { Request, Response } from "express";
import poggies from "../../../db/poggies";

const router = express.Router();

router.post("/minus", async (req: Request, res: Response) => {
  try {
    const { user_id, amount } = req.body;

    if (!user_id || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await poggies.query(
      `
            UPDATE wallets
            SET balance = balance - $1
            WHERE user_id = $2 AND balance >= $1
        `,
      [amount, user_id]
    );

    res.status(200).json({ message: "Funds subtracted successfully" });
  } catch (error) {
    console.error("Error subtracting funds from wallet:", error);
    res.status(500).json({ error: "Failed to subtract funds from wallet" });
  }
});

export default router;
