import express, { Request, Response } from "express";
import poggies from "../../db/poggies";

const router = express.Router();

router.post("/create", async (req: Request, res: Response) => {
  try {
    const { value } = req.body;

    await poggies.query();

    res.status(201).json({ message: "Event created successfully" });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Failed to create event" });
  }
});

export default router;
