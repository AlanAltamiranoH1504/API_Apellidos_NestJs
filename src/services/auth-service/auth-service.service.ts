import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthServiceService {
  private readonly salt_rounds = 10;

  async hash_password(password: string) {
    return await bcrypt.hash(password, this.salt_rounds);
  }

  async compare_password(password: string, password_hash: string) {
    return await bcrypt.compare(password, password_hash);
  }
}
