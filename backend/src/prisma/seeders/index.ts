import { PrismaClient } from "@prisma/client";
import { createAdminSeed1751307231 } from "./seeds/create-admin-seed1751307231.seeder";
import { createStudentSeed1751308259 } from "./seeds/createStudentSeed1751308259.seeder";

const prisma = new PrismaClient();
const seeders = [createAdminSeed1751307231,createStudentSeed1751308259];

async function main() {
  const prisma = new PrismaClient();
  try {
    for (const seeder of seeders) {
      const seederName = seeder.name;

      const seederExists = await prisma.seeders.findFirst({
        where: {
          name: {
            equals: seederName,
            mode: "insensitive",
          },
        },
      });

      if (seederExists) {
        console.log(`Seeder ${seederName} already executed.`);
      }

      if (!seederExists) {
        console.log(`Executing seeder: ${seederName}`);
        await prisma.$transaction(
          async (tx) => {
            await seeder(tx);
            await tx.seeders.create({
              data: {
                name: seederName,
              },
            });
          },
          { timeout: 60000 }
        );
      }
    }
  } catch (error) {
    console.error(error);
  }
  prisma.$disconnect();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
