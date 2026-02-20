import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DataToGenerateJWT, UserAdminLogin } from '../../types/AuthInterfaces';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  private readonly salt_rounds = 10;

  async hash_password(password: string) {
    return await bcrypt.hash(password, this.salt_rounds);
  }

  async compare_password(password: string, password_hash: string) {
    return await bcrypt.compare(password, password_hash);
  }

  login_admin(user: DataToGenerateJWT) {
    return {
      access_token: this.jwtService.sign(user),
    };
  }

  async validate_user_admin(email: string, password: string) {
    const user_to_found = await this.userRepository.findOne({
      where: {
        email: email,
        status: true,
      },
      relations: ['rols'],
    });

    if (!user_to_found) {
      return null;
    }

    const result_check_password = await bcrypt.compare(
      password,
      user_to_found.password,
    );

    if (!result_check_password || !user_to_found) {
      return null;
    }
    return {
      id_user: user_to_found.id_user,
      email: user_to_found.email,
      rols: user_to_found.rols,
    };
  }
}
