import Order from "../entities/Order";
import { IRequest } from "@modules/orders/domain/models/IRequestOrder";
import { IOrderRepository } from "@modules/orders/domain/repositories/IOrdersRepostory";
import { Repository, getRepository } from "typeorm";

export class OrdersRepository implements IOrderRepository {
  private ormRepository: Repository<Order>;
  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = this.ormRepository.findOne(id, {
      relations: ["order_products", "customer"],
    });

    return order;
  }

  public async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.ormRepository.create({
      customer,
      order_products: products,
    });

    await this.ormRepository.save(order);

    return order;
  }
}
