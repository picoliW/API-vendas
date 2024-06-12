import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import { ICustomersRepository } from "../domain/repositories/ICustomerRepository";

interface IRequest {
  id: string;
}

@injectable()
class DeleteCustomerService {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const customer = await this.customersRepository.findById(id);

    if (!customer) {
      throw new AppError("User not found", 404);
    }

    await this.customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
