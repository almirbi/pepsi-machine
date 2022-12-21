import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthSerializer } from './auth-serializer.provider';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [
    PassportModule.register({
      session: true,
    }),
    UsersModule,
  ],
  providers: [AuthService, LocalStrategy, AuthSerializer, PrismaService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
