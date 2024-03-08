import express, { Request, Response } from "express";
import poggies from "../../db/poggies";

const router = express.Router();

router.get("/read", async (req: Request, res: Response) => {
  try {
    const pogs = await poggies.query("SELECT * FROM pogs");
    res.status(200).json(pogs.rows);
  } catch (error) {
    console.error("Error fetching pogs:", error);
    res.status(500).json({ error: "Failed to fetch pogs" });
  }
});

export default router;
