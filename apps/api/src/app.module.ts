import { Module } from "@nestjs/common";

import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import { PrismaService } from "./prisma.service";
import { ProductsModule } from "./products/products.module";
import { ProductsService } from "./products/products.service";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [UsersModule, AuthModule, ProductsModule],
  controllers: [AppController],
  providers: [AuthService, PrismaService, ProductsService],
})
export class AppModule {}
