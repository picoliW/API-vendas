import Product from "@modules/products/infra/typeorm/entities/Product";
import { ProductRepository } from "@modules/products/infra/typeorm/repositories/ProductsRepositorie";
import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { getCustomRepository } from "typeorm";
import { IProductRepository } from "../domain/repositories/IProductRepository";

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

@injectable()
class UpdateProductService {
  constructor(
    @inject("ProductRepository")
    private productsRepository: IProductRepository,
  ) {}
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product | undefined> {
    const product = await this.productsRepository.findOne(id);

    if (!product) {
      throw new AppError("Product not found.");
    }

    const productExists = await this.productsRepository.findByName(name);

    if (productExists && name !== product.name) {
      throw new AppError("There is already one product with this name");
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await this.productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
