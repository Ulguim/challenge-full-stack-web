import { StudentController } from "./student.controller";
import { Router } from "express";
import { StudentService } from "./student.service";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const Controller = new StudentController(new StudentService(prisma));

const studentRoute = Router();

studentRoute.get("/", Controller.list.bind(Controller));
studentRoute.get("/:id", Controller.getById.bind(Controller)); 
studentRoute.post("/", Controller.create.bind(Controller));
studentRoute.put("/:id", Controller.update.bind(Controller));
studentRoute.delete("/:id", Controller.remove.bind(Controller));

export default studentRoute;
