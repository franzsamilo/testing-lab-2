import express, { Request, Response } from "express";
import poggies from "../../db/poggies";

const router = express.Router();

router.delete("/delete/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params; // This should now correctly match the pogs_id
      const pogs = await poggies.query("DELETE FROM pogs WHERE pogs_id = $1", [id]);
      res.status(200).json({ message: "Pog deleted successfully" });
    } catch (error) {
      console.error("Error deleting pogs:", error);
      res.status(500).json({ error: "Failed to delete pogs" });
    }
});


  export default router;