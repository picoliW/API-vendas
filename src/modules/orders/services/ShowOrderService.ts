import AppError from "@shared/errors/AppError";
import Order from "../infra/typeorm/entities/Order";
import { OrdersRepository } from "../infra/typeorm/repositories/OrdersRepository";
import { getCustomRepository } from "typeorm";

interface IRequest {
  id: string;
}

class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const ordersRepository = getCustomRepository(OrdersRepository);

    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new AppError("Order not found. ");
    }

    return order;
  }
}

export default ShowOrderService;