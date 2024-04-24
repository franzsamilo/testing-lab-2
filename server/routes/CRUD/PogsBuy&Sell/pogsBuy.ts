import express, { Request, Response } from "express";
import poggies from "../../../db/poggies";

const router = express.Router();

router.post("/buy", async (req: Request, res: Response) => {
  try {
    const { user_id, pogs_id, stock } = req.body;

    if (!user_id || !pogs_id || !stock) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const pogsQuery =
      "SELECT price, price_change FROM pogs_main WHERE pogs_id = $1";
    const pogsParams = [pogs_id];
    const pogsResult = await poggies.query(pogsQuery, pogsParams);

    if (pogsResult.rows.length === 0) {
      return res.status(404).json({ error: "Pog not found" });
    }

    const { price, price_change } = pogsResult.rows[0];
    const priceDiff = price * (price_change / 100);
    const currentPrice = priceDiff + price;
    const totalPrice = Math.round(currentPrice * stock);

    const walletQuery = "SELECT balance FROM wallets WHERE user_id = $1";
    const walletParams = [user_id];
    const walletResult = await poggies.query(walletQuery, walletParams);

    if (
      walletResult.rows.length === 0 ||
      walletResult.rows[0].balance < totalPrice
    ) {
      return res.status(400).json({ error: "Insufficient funds" });
    }

    const updateWalletQuery =
      "UPDATE wallets SET balance = balance - $1 WHERE user_id = $2";
    const updateWalletParams = [totalPrice, user_id];
    await poggies.query(updateWalletQuery, updateWalletParams);

    const checkQuery =
      "SELECT * FROM owned_assets WHERE user_id = $1 AND pogs_id = $2";
    const checkParams = [user_id, pogs_id];
    const checkResult = await poggies.query(checkQuery, checkParams);

    if (checkResult.rows.length > 0) {
      const updateOwnedQuery =
        "UPDATE owned_assets SET stock = stock + $1 WHERE user_id = $2 AND pogs_id = $3";
      const updateOwnedParams = [stock, user_id, pogs_id];
      await poggies.query(updateOwnedQuery, updateOwnedParams);
    } else {
      const insertQuery =
        "INSERT INTO owned_assets (user_id, pogs_id, stock) VALUES ($1, $2, $3)";
      const insertParams = [user_id, pogs_id, stock];
      await poggies.query(insertQuery, insertParams);
    }

    res.status(200).json({ message: "Pogs purchased successfully" });
  } catch (error) {
    console.error("Error buying pogs:", error);
    res.status(500).json({ error: "Failed to buy pogs" });
  }
});

export default router;
