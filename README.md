# Bun App

This project uses Bun with React and Drizzle.

## Setup

1. Install dependencies:

```bash
bun install
```

2. Create a `.env` from the provided example and update the values.

3. Generate the SQL and run the migration:

```bash
bunx drizzle-kit generate
bunx drizzle-kit migrate
```

4. Start the development server:

```bash
bun run dev
```

The server will be available at `http://localhost:3000`.

## Docker

You can also run the app with Docker:

```bash
docker-compose up
```

This will start the database, Logto, and the Bun server.
Logto will be available at `http://localhost:3001` with an admin console on `http://localhost:3002`.
