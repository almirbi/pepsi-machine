import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: CreateProductDto, user: User) {
    return this.prisma.product.create({
      data: { ...createProductDto, sellerId: user.id },
    });
  }

  // TODO pagination
  findAll() {
    return this.prisma.product.findMany({ take: 100 });
  }

  findOne(id: string) {
    return this.prisma.product.findFirst({ where: { id } });
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return this.prisma.product.update({
      data: updateProductDto,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prisma.product.delete({
      where: { id },
    });
  }
}
