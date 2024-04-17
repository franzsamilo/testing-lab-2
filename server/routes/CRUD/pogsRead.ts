import express, { Request, Response } from "express";
import poggies from "../../db/poggies";

const router = express.Router();

router.get("/read/:user_id", async (req: Request, res: Response) => {
  try {
    const user_id = req.params.user_id;

    const query = "SELECT * FROM pogs_main WHERE user_id = $1";
    const params = [user_id];

    const pogs = await poggies.query(query, params);
    res.status(200).json(pogs.rows);
  } catch (error) {
    console.error("Error fetching pogs:", error);
    res.status(500).json({ error: "Failed to fetch pogs" });
  }
});

export default router;
