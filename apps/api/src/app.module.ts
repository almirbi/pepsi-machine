import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UsersModule } from "./users/users.module";
import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import { ProductsModule } from "./products/products.module";
import { PrismaService } from "./prisma.service";
import { ProductsService } from "./products/products.service";

@Module({
  imports: [UsersModule, AuthModule, ProductsModule],
  controllers: [AppController],
  providers: [AuthService, PrismaService, ProductsService],
})
export class AppModule {}
