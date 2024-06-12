import Product from "@modules/products/infra/typeorm/entities/Product";
import { IFindProducts } from "../models/IFindProducts";
import { ICreateProduct } from "../models/ICreateProduct";

export interface IProductRepository {
  findByName(name: string): Promise<Product | undefined>;
  findAllByIds(products: IFindProducts[]): Promise<Product[]>;
  save(product: Product): Promise<Product>;
  updateQuantity(products: { id: string; quantity: number }[]): Promise<void>;
  create({ name, price, quantity }: ICreateProduct): Promise<Product>;
  findOne(id: string): Promise<Product | undefined>;
  remove(product: Product): Promise<void>;
  find(): Promise<Product[]>;
}
