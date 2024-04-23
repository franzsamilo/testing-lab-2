import express from "express";
import cors from "cors";
// ROUTES IMPORTS
import pogsCreate from "./routes/CRUD/pogsCreate";
import pogsRead from "./routes/CRUD/pogsRead";
import pogsDelete from "./routes/CRUD/pogsDelete";
import pogsUpdate from "./routes/CRUD/pogsUpdate";
import walletAdd from "./routes/CRUD/E-wallet/walletAdd";
import walletMinus from "./routes/CRUD/E-wallet/walletMinus";
import walletRead from "./routes/CRUD/E-wallet/walletRead";
import pogsGeneratePriceChange from "./routes/CRUD/PogsBuy&Sell/pogsGeneratePriceChange";

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
app.use("/api/wallet", walletAdd);
app.use("/api/wallet", walletMinus);
app.use("/api/wallet", walletRead);
app.use("/api/pogs", pogsGeneratePriceChange);

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

export default app;
