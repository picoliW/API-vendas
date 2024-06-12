import AppError from "@shared/errors/AppError";
import Order from "../infra/typeorm/entities/Order";
import { inject, injectable } from "tsyringe";
import { IOrderRepository } from "../domain/repositories/IOrdersRepostory";

interface IRequest {
  id: string;
}

@injectable()
class ShowOrderService {
  constructor(
    @inject("OrdersRepository")
    private ordersRepository: IOrderRepository,
  ) {}
  public async execute({ id }: IRequest): Promise<Order> {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new AppError("Order not found. ");
    }

    return order;
  }
}

export default ShowOrderService;
