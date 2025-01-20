import type { Application } from "express";
import cors from "cors";
import express from "express";
import { config } from "dotenv";
import tasksRoutes from "./routes/tasks";

config({ path: ".env" });

const app: Application = express();
const port = process.env.PORT || 5173;

app.use(cors());
app.use(express.json());

app.use("/tasks", tasksRoutes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
