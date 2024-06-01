import Product from "@modules/products/infra/typeorm/entities/Product";
import { ProductRepository } from "@modules/products/infra/typeorm/repositories/ProductsRepositorie";
import { getCustomRepository } from "typeorm";

class ListProductService {
  public async execute(): Promise<Product[]> {
    const productsRepository = getCustomRepository(ProductRepository);

    const products = productsRepository.find();

    return products;
  }
}

export default ListProductService;
