import { prismaMock } from '../__mocks___/prisma'
import { StudentService } from '../student.service'
import { PrismaClient } from '@prisma/client'

describe('StudentService', () => {
  let service: StudentService

  beforeEach(() => {
    service = new StudentService(prismaMock as unknown as PrismaClient)
  })

  it('should create a student', async () => {
    const dto = { name: 'John', email: 'john@example.com', ra: 'RA001', cpf: '12345678900' }
    prismaMock.student.create.mockResolvedValue({ id: '1', ...dto })

    const result = await service.create(dto)

    expect(result).toEqual({ id: '1', ...dto })
    expect(prismaMock.student.create).toHaveBeenCalledWith({ data: dto })
  })

  it('should return filtered students', async () => {
    prismaMock.student.findMany.mockResolvedValue([
      { id: '1', name: 'Jane', email: 'jane@example.com', ra: 'RA123', cpf: '98765432100', deletedAt: null },
    ])

    const result = await service.findAll({ filter: 'Jane' })

    expect(result).toHaveLength(1)
    expect(prismaMock.student.findMany).toHaveBeenCalledWith({
      where: {
        deletedAt: null,
        OR: [
          { name: { contains: 'Jane', mode: 'insensitive' } },
          { email: { contains: 'Jane', mode: 'insensitive' } },
          { ra: { contains: 'Jane', mode: 'insensitive' } },
          { cpf: { contains: 'Jane', mode: 'insensitive' } },
        ],
      },
      orderBy: { createdAt: 'desc' },
    })
  })

  it('should update a student', async () => {
    const updatedData = { name: 'Updated Name' }
    prismaMock.student.update.mockResolvedValue({ id: '1', ...updatedData })

    const result = await service.update('1', updatedData)

    expect(result).toEqual({ id: '1', ...updatedData })
    expect(prismaMock.student.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: updatedData,
    })
  })

  it('should soft-delete a student', async () => {
    const now = new Date()
    prismaMock.student.update.mockResolvedValue({ id: '1', deletedAt: now })

    const result = await service.remove('1')

    expect(result).toEqual({ id: '1', deletedAt: now })
    expect(prismaMock.student.update).toHaveBeenCalledWith({
      where: { id: '1' },
      data: { deletedAt: expect.any(Date) },
    })
  })

  it('should find a student by id', async () => {
    prismaMock.student.findFirst.mockResolvedValue({
      id: '1',
      name: 'Jane',
      deletedAt: null,
    })

    const result = await service.findById('1')

    expect(result).toEqual({ id: '1', name: 'Jane', deletedAt: null })
    expect(prismaMock.student.findFirst).toHaveBeenCalledWith({
      where: { id: '1', deletedAt: null },
    })
  })
})
