import CreateOrderService from "@modules/orders/services/CreateOrderService";
import ShowOrderService from "@modules/orders/services/ShowOrderService";
import { Request, Response } from "express";
import { container } from "tsyringe";

export default class OrderController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrder = container.resolve(ShowOrderService);

    const order = await showOrder.execute({ id });

    return response.json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      customer_id,
      products,
    });
    return response.json(order);
  }
}
