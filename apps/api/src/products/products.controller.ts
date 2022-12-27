import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from '@prisma/client';
import { LoggedInGuard } from '../auth/logged-in.guard';
import { Roles } from 'src/users/roles.decorator';
import { ROLE } from 'src/users/constants';
import { RoleGuard } from 'src/users/roles.guard';

type RequestWithUser = Request & { user: User };

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(LoggedInGuard, RoleGuard)
  @Roles(ROLE.SELLER)
  create(
    @Body() createProductDto: CreateProductDto,
    @Req() request: RequestWithUser,
  ) {
    return this.productsService.create(createProductDto, request.user);
  }

  @Get()
  @UseGuards(LoggedInGuard)
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  @UseGuards(LoggedInGuard)
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(LoggedInGuard)
  update(
    @Body() updateProductDto: UpdateProductDto,
    @Req() request: RequestWithUser,
  ) {
    return this.productsService.update(updateProductDto, request.user);
  }

  @Delete(':id')
  @UseGuards(LoggedInGuard)
  remove(@Param('id') id: string, @Req() request: RequestWithUser) {
    return this.productsService.remove(id, request.user);
  }
}
