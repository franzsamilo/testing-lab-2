import express, { Request, Response } from "express";
import poggies from "../../../db/poggies";

const router = express.Router();

router.get("/read/:user_id", async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id;

    const query = `
      SELECT owned_assets.stock, pogs_main.pogs_id, pogs_main.pogs_name, pogs_main.price, pogs_main.price_change
      FROM owned_assets
      JOIN pogs_main ON owned_assets.pogs_id = pogs_main.pogs_id
      WHERE owned_assets.user_id = $1
    `;
    const params = [user_id];
    const result = await poggies.query(query, params);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching pogs:", error);
    res.status(500).json({ error: "Failed to fetch pogs" });
  }
});

export default router;
