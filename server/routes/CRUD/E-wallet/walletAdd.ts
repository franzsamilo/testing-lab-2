import express, { Request, Response } from "express";
import poggies from "../../../db/poggies";

const router = express.Router();

router.post("/add", async (req: Request, res: Response) => {
  try {
    const { user_id, amount } = req.body;

    if (!user_id || !amount) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const walletExists = await poggies.query(
      `
            SELECT EXISTS(SELECT 1 FROM wallets WHERE user_id = $1)
        `,
      [user_id]
    );

    if (!walletExists.rows[0].exists) {
      await poggies.query(
        `
                INSERT INTO wallets (user_id, balance) VALUES ($1, 0)
            `,
        [user_id]
      );
    }

    await poggies.query(
      `
            UPDATE wallets
            SET balance = balance + $1
            WHERE user_id = $2
        `,
      [amount, user_id]
    );

    res.status(200).json({ message: "Funds added successfully" });
  } catch (error) {
    console.error("Error adding funds to wallet:", error);
    res.status(500).json({ error: "Failed to add funds to wallet" });
  }
});

export default router;
