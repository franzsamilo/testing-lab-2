import express, { Request, Response } from "express";
import poggies from "../../db/poggies";

const router = express.Router();

router.delete("/delete/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await poggies.query("DELETE FROM pogs WHERE pogs_id = $1", [id]);
    res.status(200).json({ message: "Pog deleted successfully" });
  } catch (error) {
    console.error("Error deleting Pog:", error);
    res.status(500).json({ error: "Failed to delete Pog" });
  }
});

export default router;
