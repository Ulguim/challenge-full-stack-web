import { Request, Response } from "express";
import { StudentService } from "./student.service";
import { CreateStudentDto, UpdateStudentDto } from "./student.schema";
import { validate } from "class-validator";

export class StudentController {
  constructor(private readonly service: StudentService) {}

  async create(req: Request, res: Response) {
    try {
      if (req.body.cpf) {
        req.body.cpf = req.body.cpf.replace(/\D/g, "");
      }
      const dto = Object.assign(new CreateStudentDto(), req.body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        return res.status(400).json({ error: "Validation failed", details: errors });
      }
      const student = await this.service.create(req.body);
      res.status(201).json(student);
    } catch (err) {
      res.status(400).json({ error: "Failed to create student", details: err });
    }
  }

  async list(req: Request, res: Response) {
    try {
      const { search ,limit,page} = req.query;
      const students = await this.service.findAll({
        filter: typeof search === "string" ? search : undefined,
        limit: typeof limit === "string" ? parseInt(limit) : undefined,
        page: typeof page === "string" ? parseInt(page) : undefined,
      });
      res.json(students);
    } catch (err) {
      console.error("Error creating student:", err);
      res.status(500).json({ error: "Failed to fetch students" });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const dto = Object.assign(new UpdateStudentDto(), req.body);
      const errors = await validate(dto);
      if (errors.length > 0) {
        return res.status(400).json({ error: "Validation failed", details: errors });
      }
      const updated = await this.service.update(id, req.body);
      res.json(updated);
    } catch (err) {
      res.status(400).json({ error: "Failed to update student", details: err });
    }
  }

  async remove(req: Request, res: Response) {
    const { id } = req.params;
    try {
      await this.service.remove(id);
      res.status(204).send();
    } catch (err) {
      res.status(400).json({ error: "Failed to delete student", details: err });
    }
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const student = await this.service.findById(id);
      if (!student) {
         res.status(404).json({ error: "Student not found" });
      }
      res.json(student);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch student", details: err });
    }
  }
}
