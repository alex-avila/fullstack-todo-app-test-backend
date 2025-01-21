# Full Stack Todo App Backend

An express.js application with Prisma (designed for MySQL).

Meant to be used for the [Full Stack Todo App Frontend](https://github.com/alex-avila/fullstack-todo-app-test-frontend).

## Prerequisites

LTS versions of the following are recommended

- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)
- [pnpm](https://pnpm.io/)

## Setup

1. Clone the repository

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Configure environment variables:

    - Create a `.env` file in the root directory
    - Use `.env.sample` as an example
    - `PORT` can stay the same, but replace the `DATABASE_URL` with your own database url

## Database initialization

1. Delete the `migrations` directory for this project at `./prisma/migrations`:

    ```bash
    rm -rf ./prisma/migrations
    ```

2. Use the following command to create the table in your database:

    - This command will also run the seed command found in package.json (`prisma.seed`)

    ```bash
    pnpm prisma migrate dev --name init
    ```

## Run the application

1. To run the development server:

   ```bash
   pnpm dev
   ```

2. To run the production build server:

   ```bash
   pnpm build
   pnpm start
   ```

Open [http://localhost:5173](http://localhost:5173) (if that's still the `PORT`) with your browser and you should see "Hello world".
