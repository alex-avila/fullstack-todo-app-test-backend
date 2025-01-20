import type { Application } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import express from "express";
import { config } from "dotenv";

config({ path: ".env" });

const prisma = new PrismaClient();

async function main() {
  const allTasks = await prisma.task.findMany();
  console.log(allTasks);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit();
  });

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
