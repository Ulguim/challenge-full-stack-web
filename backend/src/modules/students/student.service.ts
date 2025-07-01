import prisma from "../../config/prisma";
import { CreateStudentDto, UpdateStudentDto } from "./student.schema";

export class StudentService {
  async create(data: CreateStudentDto) {
    return await prisma.student.create({ data });
  }

  async findAll(params?: { filter?: string }) {
    const where: any = { deletedAt: null };

    if (params?.filter) {
      where.OR = [
        { name: { contains: params.filter, mode: "insensitive" } },
        { email: { contains: params.filter, mode: "insensitive" } },
        { ra: { contains: params.filter, mode: "insensitive" } },
        { cpf: { contains: params.filter, mode: "insensitive" } },
      ];
    }

    return await prisma.student.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  }

  async update(id: string, data: UpdateStudentDto) {
    return await prisma.student.update({ where: { id }, data });
  }

  async remove(id: string) {
    return await prisma.student.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
