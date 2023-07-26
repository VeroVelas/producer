import { Product } from "./Product";

export interface ProductRepository {
  getAll(): Promise<Product[] | null>;
  getById(userId: number): Promise<Product | null>;
  createProduct(
    name: string,
    cntraseña: string,
    raza: string
  ): Promise<Product | null>;
}
