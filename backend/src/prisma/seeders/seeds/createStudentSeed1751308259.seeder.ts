import { PrismaClient } from "@prisma/client";
let prisma: PrismaClient;

export async function createStudentSeed1751308259(
  prisma: Pick<PrismaClient, "student">
): Promise<void> {
  const students = [
    {
      name: "Alice Johnson",
      email: "alice@example.com",
      ra: "RA1001",
      cpf: "12345678901",
    },
    {
      name: "Bob Smith",
      email: "bob@example.com",
      ra: "RA1002",
      cpf: "98765432100",
    },
  ];

  for (const student of students) {
    const exists = await prisma.student.findFirst({
      where: {
        OR: [
          { ra: student.ra },
          { email: student.email },
          { cpf: student.cpf },
        ],
      },
    });

    if (exists) {
      console.log(`Student with RA ${student.ra} already exists. Skipping...`);
      continue;
    }

    await prisma.student.create({ data: student });
    console.log(`Student with RA ${student.ra} created successfully.`);
  }
}
