import prisma from "../../config/prisma"
import { CreateStudentDto, UpdateStudentDto } from "./student.schema"

export class StudentService {
  async create(data: CreateStudentDto) {
    return await prisma.student.create({ data })
  }

  async findAll() {
    return await prisma.student.findMany({ where: { deletedAt: null } })
  }

  async update(id: string, data: UpdateStudentDto) {
    return await prisma.student.update({ where: { id }, data })
  }

  async remove(id: string) {
    return await prisma.student.update({
      where: { id },
      data: { deletedAt: new Date() },
    })
  }
}