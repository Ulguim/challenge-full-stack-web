import express from "express";
import cors from "cors";
import "dotenv/config";
import studentRoute from "./modules/students/student.routes";
import prisma from "./config/prisma";
import authRoute from "./modules/auth/auth.route";
import { authMiddleware } from "./middlewares/auth.middleware";

const app = express();

async function bootstrap() {
  app.use(express.json());

  const env = process.env.NODE_ENV || "development";

  if (env === "development") {
    app.use(cors());
  }

  try {
    await prisma.$connect();
    console.log("Database connected...");
  } catch (err) {
    console.error("Database connection error", err);
    process.exit(1);
  }

  app.use("/students", authMiddleware, studentRoute);
  app.use("/auth", authRoute);

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log("server running on port", port));
}

bootstrap();
