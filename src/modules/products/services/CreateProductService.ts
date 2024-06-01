import Product from "@modules/products/infra/typeorm/entities/Product";
import { ProductRepository } from "@modules/products/infra/typeorm/repositories/ProductsRepositorie";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { getRepository } from "typeorm";
import { IProductRepository } from "../domain/repositories/IProductRepository";

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject("ProductRepository")
    private productsRepository: IProductRepository,
  ) {}
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productExists = await this.productsRepository.findByName(name);

    if (productExists) {
      throw new AppError("There is already one product with this name");
    }

    const product = await this.productsRepository.create({
      name,
      price,
      quantity,
    });

    await this.productsRepository.save(product);

    return product;
  }
}

export default CreateProductService;
