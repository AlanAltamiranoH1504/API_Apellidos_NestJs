import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RolsModule } from '../rols/rols.module';
import { Rol } from '../rols/entities/rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Rol]), RolsModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserModule],
})
export class UserModule {}
