
import { PrismaClient } from "@prisma/client";
import { CreateStudentDto, UpdateStudentDto } from "./student.schema";

export class StudentService {
    constructor(private prisma: PrismaClient) {}
  async create(data: CreateStudentDto) {
    return await this.prisma.student.create({ data });
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

    return await this.prisma.student.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  }

  async update(id: string, data: UpdateStudentDto) {
    return await this.prisma.student.update({ where: { id }, data });
  }

  async remove(id: string) {
    return await this.prisma.student.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async findById(id: string) {
    return await this.prisma.student.findFirst({
      where: { id, deletedAt: null },
    });
  }
}
