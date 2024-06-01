import { IProductRepository } from "@modules/products/domain/repositories/IProductRepository";
import Product from "../entities/Product";
import { IFindProducts } from "@modules/products/domain/models/IFindProducts";
import { Repository, getRepository } from "typeorm";
import { ICreateProduct } from "@modules/products/domain/models/ICreateProduct";

export class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;
  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async updateQuantity(
    products: { id: string; quantity: number }[],
  ): Promise<void> {
    await this.ormRepository.save(products);
  }

  public async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);

    return product;
  }

  public async create({
    name,
    price,
    quantity,
  }: ICreateProduct): Promise<Product> {
    const customer = this.ormRepository.create({ name, price, quantity });

    await this.ormRepository.save(customer);

    return customer;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productsIds = products.map(product => product.id);

    const existsProducts = await this.ormRepository.find({
      where: {
        id: productsIds,
      },
    });

    return existsProducts;
  }

  public async findOne(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id);
    return product;
  }

  public async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }

  public async find(): Promise<Product[]> {
    const products = await this.ormRepository.find();
    return products;
  }
}
