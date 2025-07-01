import { StudentController } from "./student.controller";
import { Router } from "express";
const Controller = new StudentController();

const studentRoute = Router();

studentRoute.get("/", Controller.list);
studentRoute.get("/:id", Controller.getById); // Assuming this is for fetching a single student by ID
studentRoute.post("/", Controller.create);
studentRoute.put("/:id", Controller.update);
studentRoute.delete("/:id", Controller.remove);

export default studentRoute;
