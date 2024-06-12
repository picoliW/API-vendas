import Product from "@modules/products/infra/typeorm/entities/Product";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../domain/repositories/IProductRepository";

interface IRequest {
  id: string;
}

@injectable()
class ShowProductService {
  constructor(
    @inject("ProductRepository")
    private productsRepository: IProductRepository,
  ) {}
  public async execute({ id }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findOne(id);

    if (!product) {
      throw new AppError("Product not found.");
    }

    return product;
  }
}

export default ShowProductService;
