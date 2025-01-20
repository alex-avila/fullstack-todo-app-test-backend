import type { Application } from "express";
import cors from "cors";
import express from "express";
import { config } from "dotenv";

config({ path: ".env" });

const app: Application = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
