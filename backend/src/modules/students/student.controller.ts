import { Request, Response } from "express";
import { StudentService } from "./student.service";

const service = new StudentService()

export class StudentController {
  async create(req: Request, res: Response) {
    try {
      const student = await service.create(req.body)
      res.status(201).json(student)
    } catch (err) {

      res.status(400).json({ error: 'Failed to create student', details: err })
    }
  }

  async list(req: Request, res: Response) {
    try {
      const students = await service.findAll()
      res.json(students)
    } catch (err) {
            console.error('Error creating student:', err)
      res.status(500).json({ error: 'Failed to fetch students' })
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params
    try {
      const updated = await service.update(id, req.body)
      res.json(updated)
    } catch (err) {
      res.status(400).json({ error: 'Failed to update student', details: err })
    }
  }

  async remove(req: Request, res: Response) {
    const { id } = req.params
    try {
      await service.remove(id)
      res.status(204).send()
    } catch (err) {
      res.status(400).json({ error: 'Failed to delete student', details: err })
    }
  }
}