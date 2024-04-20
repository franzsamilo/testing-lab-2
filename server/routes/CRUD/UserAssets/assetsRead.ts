import express, { Request, Response } from "express";
import poggies from "../../../db/poggies";

const router = express.Router();

router.get("/assets", async (req: Request, res: Response) => {
  try {
    const userId = req.query.userId || req.body.userId;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required" });
    }

    const result = await poggies.query(
      `
            SELECT op.pogs_id, op.stock, op.total_value, pm.price
            FROM owned_pogs op
            JOIN pogs_main pm ON op.pogs_id = pm.pogs_id
            WHERE op.user_id = $1
        `,
      [userId]
    );

    const assets = result.rows.map((row: any) => ({
      pogs_id: row.pogs_id,
      stock: row.stock,
      total_value: row.stock * row.price,
    }));

    res.status(200).json(assets);
  } catch (error) {
    console.error("Error fetching assets:", error);
    res.status(500).json({ error: "Failed to fetch assets" });
  }
});

export default router;
