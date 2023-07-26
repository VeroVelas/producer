import { Product } from "../domain/Product";
import { ProductRepository } from "../domain/ProductRepository";

export class CreateProductUseCase {
  constructor(readonly productRepository: ProductRepository) {}

  async run(
    name: string,
    contraseña: string,
    raza: string
  ): Promise<Product | null> {
    try {
      const product = await this.productRepository.createProduct(
        name,
        contraseña,
        raza
      );
      return product;
    } catch (error) {
      return null;
    }
  }
}
