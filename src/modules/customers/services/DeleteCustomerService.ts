import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import CustomersRepository from "../infra/typeorm/repositories/CustomersRepository";

interface IRequest {
  id: string;
}

@injectable()
class DeleteCustomerService {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: CustomersRepository,
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
