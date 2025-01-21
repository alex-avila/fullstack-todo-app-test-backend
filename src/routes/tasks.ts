import { Router } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import { z } from "zod";

export const TaskCreateInput = z.object({
  title: z.string().max(255),
  color: z.string().max(7).optional(),
}) satisfies z.Schema<Prisma.TaskUncheckedCreateInput>;

export const TaskUpdateInput = z.object({
  id: z.coerce.number(),
  title: z.string().max(255).optional(),
  color: z.string().max(7).optional(),
  completed: z.boolean().optional(),
}) satisfies z.Schema<Prisma.TaskUncheckedUpdateInput>;

const router = Router();

const prisma = new PrismaClient().$extends({
  query: {
    task: {
      create({ args, query }) {
        args.data = TaskCreateInput.parse(args.data);
        return query(args);
      },
      update({ args, query }) {
        args.data = TaskUpdateInput.partial().parse(args.data);
        return query(args);
      },
    },
  },
});

router.get("/", async (req, res) => {
  try {
    const allTasks = await prisma.task.findMany();

    res.json(allTasks);
  } catch (error) {
    console.error(error);
    res.json({ error: "Unexpected error: Unable to fetch tasks" });
  }
});

router.post(`/`, async (req, res) => {
  const { title, color } = req.body;

  try {
    const result = await prisma.task.create({
      data: {
        title,
        ...(color && { color }),
      },
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.json({ error: "Unexpected error: Unable to create task" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, color, completed } = req.body;

  try {
    const updatedTask = await prisma.task.update({
      where: { id: Number(id) || undefined },
      data: {
        ...(title && { title }),
        ...(color && { color }),
        ...((completed || completed === false) && { completed }),
      },
    });

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.json({ error: "Unable to update task or it does not exist" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const task = await prisma.task.delete({
      where: { id: Number(id) || undefined },
    });
    res.json(task);
  } catch (error) {
    console.error(error);
    res.json({
      error: "Unexpected error: Unable to delete task or it doesn't exist",
    });
  }
});

export default router;
