

import * as bcrypt from 'bcrypt';
export class BcryptService  {
  async encrypt(value: string): Promise<string> {
    const salts = process.env.BCRYPT_SALTS || '10';
    return bcrypt.hash(value, parseInt(salts, 10));
  }

  encryptSync(value: string): string {
    return bcrypt.hashSync(value, parseInt(process.env.BCRYPT_SALTS || '10', 10));
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}