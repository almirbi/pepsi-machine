import { Test, TestingModule } from '@nestjs/testing';
import { Prisma, Product, User } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductsService } from './products.service';

// TODO create some sort of factory for these
const product: CreateProductDto = {
  amountAvailable: 2,
  cost: 100,
  productName: 'letter opener',
};

// TODO add to before each
const user: User = {
  id: '1',
  username: 'almir',
  password: '111',
  deposit: 100,
  role: 'BUYER',
};

const productRecord = {
  ...product,
  id: '1',
  sellerId: user.id,
} as unknown as Prisma.Prisma__ProductClient<Product>;

const products = [
  { ...product, id: '2', sellerId: '1' },
  { ...product, id: '3', sellerId: '1' },
] as unknown as Prisma.Prisma__ProductClient<Product[]>;

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, PrismaService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create product', async () => {
    jest
      .spyOn(prisma.product, 'create')
      .mockImplementation(() => productRecord);
    const newProd = await service.create(product, user);
    expect(newProd.id).toBe('1');
  });

  it('should get all products', async () => {
    jest.spyOn(prisma.product, 'findMany').mockImplementation(() => products);
    const allProducts = await service.findAll();
    expect(allProducts[0].id).toBe('2');
  });

  it('should get product 3', async () => {
    jest
      .spyOn(prisma.product, 'findFirst')
      .mockImplementation(() => products[1]);
    const product2 = await service.findOne('3');
    expect(product2.id).toBe('3');
  });
});
