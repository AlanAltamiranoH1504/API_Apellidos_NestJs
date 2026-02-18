import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NamesModule } from './modules/names/names.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { ProductModule } from './modules/product/product.module';
import { ProgramModule } from './modules/program/program.module';
import { ClientsModule } from './modules/clients/clients.module';
import { AuthServiceService } from './services/auth-service/auth-service.service';
import { AuthServiceModule } from './services/auth-service/auth-service.module';
import { AdressModule } from './modules/adress/adress.module';
import { OrderModule } from './modules/order/order.module';
import { RolsModule } from './modules/rols/rols.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    NamesModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: typeOrmConfig,
      inject: [ConfigService],
    }),
    ProductModule,
    ProgramModule,
    ClientsModule,
    AuthServiceModule,
    AdressModule,
    OrderModule,
    RolsModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthServiceService],
})
export class AppModule {}
