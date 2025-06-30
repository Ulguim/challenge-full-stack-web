import express from "express";
import cors from "cors";
import "dotenv/config";
import studentRoute from "./modules/students/student.routes";
import prisma from "./config/prisma";

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
  app.use("/api", studentRoute);
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log("server running on port 3000"));
}

bootstrap();
