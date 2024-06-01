import AppError from "@shared/errors/AppError";
import Order from "../infra/typeorm/entities/Order";
import { IOrderRepository } from "../domain/repositories/IOrdersRepostory";
import { inject, injectable } from "tsyringe";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomerRepository";
import { IProductRepository } from "@modules/products/domain/repositories/IProductRepository";

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}
@injectable()
class CreateOrderService {
  constructor(
    @inject("OrdersRepository")
    private ordersRepository: IOrderRepository,

    @inject("CustomersRepository")
    private customersRepository: ICustomersRepository,

    @inject("ProductRepository")
    private productsRepository: IProductRepository,
  ) {}
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const customerExists = await this.customersRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError("Customer not found");
    }

    const existsProducts = await this.productsRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError("Could not find any products with the given ids");
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(
        `Could not find any product ${checkInexistentProducts[0].id}`,
      );
    }

    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(p => p.id === product.id)[0].quantity <
        product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is no available for ${quantityAvailable[0].id}`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await this.ordersRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { order_products } = order;

    const updatedProductQuantity = order_products.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity -
        product.quantity,
    }));

    await this.productsRepository.updateQuantity(updatedProductQuantity);

    return order;
  }
}

export default CreateOrderService;
