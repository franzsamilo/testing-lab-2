import express from "express";
import cors from "cors";
// ROUTES IMPORTS
import pogsCreate from "./routes/CRUD/pogsCreate";
import pogsRead from "./routes/CRUD/pogsRead";
import pogsDelete from "./routes/CRUD/pogsDelete";
import pogsUpdate from "./routes/CRUD/pogsUpdate";

const app = express();
const port = 6969;
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

// ROUTES
app.use("/api/pogs", pogsCreate);
app.use("/api/pogs", pogsRead);
app.use("/api/pogs", pogsDelete);
app.use("/api/pogs", pogsUpdate);

// app.listen(port, () => {
//   console.log(`Server listening on ${port}`);
// });

export default app;
