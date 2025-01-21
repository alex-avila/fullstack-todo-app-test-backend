import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

const tasks: Prisma.TaskCreateInput[] = [
  {
    title: "Get started. Click the checkbox to complete this task",
    color: "#5856D6",
  },
];

async function main() {
  console.log(`Start seeding ...`);
  for (const task of tasks) {
    const createdTask = await prisma.task.create({
      data: task,
    });
    console.log(`Created task with id: ${createdTask.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
