import * as path from 'path';

async function createSeedMigration(): Promise<void> {
  const name = process.argv[2];
  const currentpath = await path.resolve(__dirname, '..');
  const unixTimestamp = Math.floor(Date.now() / 1000).toString();
  const fileName = `${name}${unixTimestamp}.seeder.ts`;
  const fileContent = `
  import { PrismaClient } from '@prisma/client';
  let prisma: PrismaClient;

  export async function ${name}${unixTimestamp}(
  prisma: Pick<PrismaClient, 'entityName'>,
  ): Promise<void> {
  }
  
  `;
  const fs = require('fs');
  const filePath = path.join(currentpath, 'seeders/seeds', fileName);
  fs.writeFile(filePath, fileContent, (err: any) => {
    if (err) {
      console.error('Error creating file:', err);
    } else {
      console.log(`File ${fileName} created successfully at ${filePath}`);
    }
  });
}

createSeedMigration().catch((error) => {
  console.error('Error creating seed migration:', error);
});