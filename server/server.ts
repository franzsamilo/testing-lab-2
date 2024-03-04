import express from "express";
import cors from "cors";

// ROUTES IMPORTS
import pogsCreate from "./routes/CRUD/pogsCreate";

const app = express();
const port = 6969;
app.use(
  cors({
    origin: `http://localhost:${port}`,
    credentials: true,
  })
);
app.use(express.json());

// ROUTES
app.use("/api/pogs", pogsCreate);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
