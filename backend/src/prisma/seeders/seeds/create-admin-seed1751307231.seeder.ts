import { PrismaClient } from "@prisma/client";
import { BcryptService } from "../../../modules/auth/encypter.service";

export async function createAdminSeed1751307231(
  prisma: Pick<PrismaClient, "user">
): Promise<void> {
  const encrypter = new BcryptService();
  const USER_EMAIL = process.env.DEFAULT_ADMIN_EMAIL;
  const USER_PASSWORD = process.env.DEFAULT_ADMIN_PASSWORD;

  if(!USER_EMAIL || !USER_PASSWORD) {
    console.error("Default admin email or password not set in environment variables.");
    return;
  }
  const userExists = await prisma.user.findFirst({
    where: {
      email: USER_EMAIL,
    },
  });

  if (userExists) {
    console.log("Admin user already exists, skipping creation.");
    return;
  }

  await prisma.user.create({
    data: {
      email: USER_EMAIL,

      password: encrypter.encryptSync(USER_PASSWORD),
    },
  });
}


