import { query } from "../../database/mysql";
import { Product } from "../domain/Product";
import { ProductRepository } from "../domain/ProductRepository";

export class MysqlProductRepository implements ProductRepository {
  async getAll(): Promise<Product[] | null> {
    const sql = "SELECT * FROM product";
    try {
      const [data]: any = await query(sql, []);
      const dataProducts = Object.values(JSON.parse(JSON.stringify(data)));

      return dataProducts.map(
        (product: any) =>
          new Product(
            product.id,
            product.name,
            product.contraseña,
            product.raza
          )
      );
    } catch (error) {
      return null;
    }
  }

  async getById(userId: number): Promise<Product | null> {
    const sql = "SELECT * FROM product WHERE id=?";
    const params: any[] = [userId];
    try {
      const [result]: any = await query(sql, params);
      //El objeto Result es un objeto que contiene info generada de la bd
      /*No es necesaria la validación de la cantidad de filas afectadas, ya que, al
            estar dentro de un bloque try/catch si hay error se captura en el catch */
      return new Product(
        result[0].id,
        result[0].name,
        result[0].contraseña,
        result[0].raza
      );
    } catch (error) {
      return null;
    }
  }

  async createProduct(
    name: string,
    contraseña: string,
    raza: string
  ): Promise<Product | null> {
    const sql = "INSERT INTO product (name, contraseña, raza) VALUES (?, ?, ?)";
    const params: any[] = [name, contraseña, raza];
    try {
      const [result]: any = await query(sql, params);
      //El objeto Result es un objeto que contiene info generada de la bd
      /*No es necesaria la validación de la cantidad de filas afectadas, ya que, al
            estar dentro de un bloque try/catch si hay error se captura en el catch */
      return new Product(result.insertId, name, contraseña, raza);
    } catch (error) {
      return null;
    }
  }
}
