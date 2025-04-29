import express from "express";
import prductRoutes from "./routes/productRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import dotenv from "dotenv";
dotenv.config();
import connectDb from "./config/db.js";
const port = process.env.PORT || 5000;
connectDb();

const app = express();

app.get("/", (req, res) => {
  res.send("Api is Running");
});

app.use("/api/products", prductRoutes);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on port no :${port}`);
});
