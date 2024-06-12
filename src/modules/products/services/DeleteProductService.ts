import AppError from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IProductRepository } from "../domain/repositories/IProductRepository";

interface IRequest {
  id: string;
}

@injectable()
class DeleteProductService {
  constructor(
    @inject("ProductRepository")
    private productsRepository: IProductRepository,
  ) {}
  public async execute({ id }: IRequest): Promise<void> {
    const product = await this.productsRepository.findOne(id);

    if (!product) {
      throw new AppError("Product not found.");
    }

    await this.productsRepository.remove(product);
  }
}

export default DeleteProductService;
