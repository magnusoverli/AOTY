# Bun App

This project uses Bun with React and Drizzle.

## Setup

1. Install dependencies:

```bash
bun install
```

2. Create a `.env` from the provided example and update the values. Set
   `ADMIN_EMAIL` to the first administrator account.

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
# apply database migrations
docker-compose run migrate
# start the services
docker-compose up
```

Make sure `LOGTO_ENDPOINT` in `.env` is set to `http://logto:3001` so the app
container can reach Logto. The admin console will be available at
`http://localhost:3002`.

If migrations fail with `No schema files found`, ensure `schema` in
`drizzle.config.ts` is `./src/db/schema.ts`.

`POSTGRES_USER`, `POSTGRES_PASSWORD`, and `POSTGRES_DB` in `.env` configure
the database containers. If migrations fail with errors like
`column "is_admin" does not exist`, remove the volume and rerun them:

```bash
docker-compose down -v
docker-compose run migrate
```
