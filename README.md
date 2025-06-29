# Bun App

This project uses Bun with React, Drizzle and Logto for authentication.

## Setup

1. Install dependencies:

```bash
bun install
```

2. Create a `.env` from the provided example and update the values.
   You'll need `LOGTO_ENDPOINT` and `LOGTO_APP_ID` for the Logto service.
   The Postgres variables are used by Docker when starting the stack.

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

This will start Postgres and Logto. The Logto service waits for Postgres,
deploys its database changes, seeds initial data and then starts. The Bun app
launches once both services are ready.
