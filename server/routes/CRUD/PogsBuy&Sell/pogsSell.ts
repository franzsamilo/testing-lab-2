import express, { Request, Response } from "express";
import poggies from "../../../db/poggies";

const router = express.Router();

router.post("/sell", async (req: Request, res: Response) => {
  try {
    const { user_id, pogs_id, stock } = req.body;

    if (!user_id || !pogs_id || !stock) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const pogsQuery = "SELECT price FROM pogs_main WHERE pogs_id = $1";
    const pogsParams = [pogs_id];
    const pogsResult = await poggies.query(pogsQuery, pogsParams);

    if (pogsResult.rows.length === 0) {
      return res.status(404).json({ error: "Pog not found" });
    }

    const { price } = pogsResult.rows[0];
    const totalPrice = Math.round(price * stock);

    const checkQuery =
      "SELECT * FROM owned_assets WHERE user_id = $1 AND pogs_id = $2";
    const checkParams = [user_id, pogs_id];
    const checkResult = await poggies.query(checkQuery, checkParams);

    if (checkResult.rows.length === 0 || checkResult.rows[0].stock < stock) {
      return res.status(400).json({ error: "Insufficient stock" });
    }

    const updateWalletQuery =
      "UPDATE wallets SET balance = balance + $1 WHERE user_id = $2";
    const updateWalletParams = [totalPrice, user_id];
    await poggies.query(updateWalletQuery, updateWalletParams);

    const updateOwnedQuery =
      "UPDATE owned_assets SET stock = stock - $1 WHERE user_id = $2 AND pogs_id = $3 RETURNING stock";
    const updateOwnedParams = [stock, user_id, pogs_id];
    const updateResult = await poggies.query(
      updateOwnedQuery,
      updateOwnedParams
    );

    if (updateResult.rows[0].stock === 0) {
      const deleteQuery =
        "DELETE FROM owned_assets WHERE user_id = $1 AND pogs_id = $2";
      const deleteParams = [user_id, pogs_id];
      await poggies.query(deleteQuery, deleteParams);
    }

    res.status(200).json({ message: "Pogs sold successfully" });
  } catch (error) {
    console.error("Error selling pogs:", error);
    res.status(500).json({ error: "Failed to sell pogs" });
  }
});

export default router;
