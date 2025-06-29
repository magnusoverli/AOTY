FROM oven/bun:latest as builder
WORKDIR /app
COPY . .
RUN bun install
RUN bun run build

FROM oven/bun:latest
WORKDIR /app
COPY --from=builder /app .
ENV NODE_ENV=production
EXPOSE 3000
CMD ["bun", "start"]
