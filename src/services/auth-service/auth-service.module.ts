import { Module } from '@nestjs/common';
import { AuthServiceService } from './auth-service.service';

@Module({
  providers: [AuthServiceService],
  exports: [AuthServiceService],
})
export class AuthServiceModule {}
