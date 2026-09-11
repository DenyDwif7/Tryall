import { Elysia } from "elysia";
import { db } from "./db";
import { users } from "./db/schema";

const port = Number(process.env.PORT) || 3000;

const app = new Elysia()
  .get("/", () => ({
    name: "Tryall Backend API",
    status: "online",
    runtime: "Bun",
    framework: "ElysiaJS",
    orm: "Drizzle",
    database: "MySQL",
  }))
  .get("/health", () => ({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  }))
  .group("/api", (api) =>
    api
      .get("/users", async () => {
        try {
          const allUsers = await db.select().from(users);
          return { success: true, data: allUsers };
        } catch (error) {
          return {
            success: false,
            message: "Database query failed. Please verify MySQL connection.",
            error: error instanceof Error ? error.message : String(error),
          };
        }
      })
      .post("/users", async ({ body, set }) => {
        try {
          const { name, email } = body as { name: string; email: string };
          if (!name || !email) {
            set.status = 400;
            return { success: false, message: "Name and email are required" };
          }
          await db.insert(users).values({ name, email });
          set.status = 201;
          return { success: true, message: "User created successfully" };
        } catch (error) {
          set.status = 500;
          return {
            success: false,
            message: "Failed to insert user",
            error: error instanceof Error ? error.message : String(error),
          };
        }
      })
  )
  .listen(port);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);

export type App = typeof app;
