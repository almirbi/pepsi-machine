import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { getChangeArray } from './utils';

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

  async buy(id: string, amount: number, user: User) {
    const product = await this.prisma.product.findUnique({ where: { id } });

    const totalPrice = product.cost * amount;
    if (product.amountAvailable < amount) {
      throw new Error('not enough product');
    }

    if (totalPrice > user.deposit) {
      throw new Error('not enough money');
    }

    await this.prisma.product.update({
      where: { id },
      data: {
        amountAvailable: product.amountAvailable - amount,
      },
    });

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        deposit: user.deposit - totalPrice,
      },
    });

    return {
      totalSpent: totalPrice,
      product,
      change: getChangeArray(totalPrice, user.deposit),
    };
  }
}
