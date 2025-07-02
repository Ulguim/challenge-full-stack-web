import { PrismaClient } from "@prisma/client";
import { CreateStudentDto, UpdateStudentDto } from "./student.schema";

export class StudentService {
  constructor(private readonly prisma: PrismaClient) {}
  async create(data: CreateStudentDto) {
    return await this.prisma.student.create({ data });
  }

  async findAll(params?: { filter?: string; page?: number; limit?: number }) {
    const where: any = { deletedAt: null };

    if (params?.filter) {
      where.OR = [
        { name: { contains: params.filter, mode: "insensitive" } },
        { email: { contains: params.filter, mode: "insensitive" } },
        { ra: { contains: params.filter, mode: "insensitive" } },
        { cpf: { contains: params.filter, mode: "insensitive" } },
      ];
    }
    
    const page = params?.page ?? 1;
    const limit = params?.limit ?? 10;
    const skip = (page - 1) * limit;

    const [students, total] = await Promise.all([
      this.prisma.student.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      this.prisma.student.count({ where }),
    ]);

    return {
      data: students,
      total,
      page,
      limit,
    };
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
