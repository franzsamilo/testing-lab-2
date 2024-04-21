import express, { Request, Response } from "express";
import poggies from "../../../db/poggies";

const router = express.Router();

router.get("/read/:user_id", async (req: Request, res: Response) => {
  try {
    const userId = req.params.user_id;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const result = await poggies.query(
      `
            SELECT balance
            FROM wallets
            WHERE user_id = $1
        `,
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ balance: result.rows[0].balance });
  } catch (error) {
    console.error("Error fetching wallet balance:", error);
    res.status(500).json({ error: "Failed to fetch wallet balance" });
  }
});

export default router;
