import express, { Request, Response } from "express";
import poggies from "../../db/poggies";

const router = express.Router();

router.delete("/delete/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await poggies.query(
      "DELETE FROM pogs_main WHERE pogs_id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Pog not found" });
    }
    res.status(200).json({ message: "Pog deleted successfully" });
  } catch (error) {
    console.error("Error deleting Pog:", error);
    res.status(500).json({ error: "Failed to delete Pog" });
  }
});
export default router;
