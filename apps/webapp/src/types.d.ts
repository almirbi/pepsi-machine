import { Product, User as PrismaUser } from "database";

export type Rupee = 5 | 10 | 20 | 50 | 100;

// TODO share from API
export type BuyResult = {
  totalSpent: number;
  product: Product;
  change: number[];
};

export type User = Omit<PrismaUser, "password">;
