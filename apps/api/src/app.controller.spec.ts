import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { PrismaService } from './prisma.service';
import { ProductsService } from './products/products.service';
import { ROLE } from './users/constants';
import { CreateUserDto } from './users/dto/create-user.dto';
import { UsersService } from './users/users.service';
import * as httpMocks from 'node-mocks-http';
import { Product, User } from '@prisma/client';
import { CreateProductDto } from './products/dto/create-product.dto';

const newBuyer: CreateUserDto = {
  username: 'bob',
  password: '13378',
  role: ROLE.BUYER,
};

const newSeller: CreateUserDto = {
  username: 'alice',
  password: '13378',
  role: ROLE.SELLER,
};

const newProduct1: CreateProductDto = {
  productName: 'Whisker',
  amountAvailable: 11,
  cost: 250,
};

const newProduct2: CreateProductDto = {
  productName: 'Broom',
  amountAvailable: 90,
  cost: 23,
};

const STARTING_DEPOSIT = 5002;
const ADDED_DEPOSIT = 100;

describe('AppController', () => {
  let appController: AppController;
  let prisma: PrismaService;
  let buyer: User;
  let seller: User;
  let product1: Product;
  let product2: Product;
  let mockRequest: RequestWithUser;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    prisma = app.get<PrismaService>(PrismaService);
    buyer = await prisma.user.create({
      data: { ...newBuyer, deposit: STARTING_DEPOSIT },
    });
    seller = await prisma.user.create({
      data: { ...newSeller, deposit: 1002 },
    });

    product1 = await prisma.product.create({
      data: { ...newProduct1, sellerId: seller.id },
    });

    product2 = await prisma.product.create({
      data: { ...newProduct2, sellerId: seller.id },
    });
  });

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [UsersService, PrismaService, ProductsService],
    }).compile();

    appController = app.get<AppController>(AppController);
    mockRequest = httpMocks.createRequest() as never as RequestWithUser;
    mockRequest.user = buyer;
  });

  type RequestWithUser = Request & { user: User };
  describe('root', () => {
    it('should /deposit 100', async () => {
      const response = await appController.deposit(
        { deposit: ADDED_DEPOSIT },
        mockRequest,
      );

      expect(response.deposit).toBe(STARTING_DEPOSIT + ADDED_DEPOSIT);
    });

    it('should /buy 100', async () => {
      const AMOUNT = 3;
      const response = await appController.buy(
        { productId: product2.id, amount: AMOUNT },
        mockRequest,
      );

      expect(response.totalSpent).toBe(product2.cost * AMOUNT);
      expect(response.product.amountAvailable).toBe(
        newProduct2.amountAvailable - AMOUNT,
      );
    });

    it('should /buy 100', async () => {
      const AMOUNT = 3;
      const response = await appController.buy(
        { productId: product1.id, amount: AMOUNT },
        mockRequest,
      );

      expect(response.totalSpent).toBe(product1.cost * AMOUNT);
      expect(response.product.amountAvailable).toBe(
        product1.amountAvailable - AMOUNT,
      );
    });
  });

  afterAll(async () => {
    const deleteUsers = prisma.user.deleteMany();
    const deleteProducts = prisma.product.deleteMany();

    await prisma.$transaction([deleteProducts, deleteUsers]);

    await prisma.$disconnect();
  });
});
