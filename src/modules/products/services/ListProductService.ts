import Product from "@modules/products/infra/typeorm/entities/Product";
import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../domain/repositories/IProductRepository";

@injectable()
class ListProductService {
  constructor(
    @inject("ProductRepository")
    private productsRepository: IProductRepository,
  ) {}
  public async execute(): Promise<Product[]> {
    const products = this.productsRepository.find();

    return products;
  }
}

export default ListProductService;
