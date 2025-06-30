import { StudentController } from "./student.controller";
import { Router } from "express";
const Controller = new StudentController();

const studentRoute = Router();

studentRoute.get("/", Controller.list);

export default studentRoute;
