import Order from "@modules/orders/infra/typeorm/entities/Order";
import { IRequest } from "../models/IRequestOrder";

export interface IOrderRepository {
  findById(id: string): Promise<Order | undefined>;
  createOrder({ customer, products }: IRequest): Promise<Order>;
}
