import { container } from "tsyringe";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomerRepository";
import CustomersRepository from "@modules/customers/infra/typeorm/repositories/CustomersRepository";
import { IOrderRepository } from "@modules/orders/domain/repositories/IOrdersRepostory";
import { OrdersRepository } from "@modules/orders/infra/typeorm/repositories/OrdersRepository";
import { IProductRepository } from "@modules/products/domain/repositories/IProductRepository";
import { ProductRepository } from "@modules/products/infra/typeorm/repositories/ProductsRepositorie";
import "reflect-metadata";
import { IUserRepository } from "@modules/users/domain/repositories/IUserRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { IUserTokenRepository } from "@modules/users/domain/repositories/IUserTokenRepository";
import UsersTokensRepository from "@modules/users/infra/typeorm/repositories/UserTokensRepository";

container.registerSingleton<ICustomersRepository>(
  "CustomersRepository",
  CustomersRepository,
);

container.registerSingleton<IOrderRepository>(
  "OrdersRepository",
  OrdersRepository,
);

container.registerSingleton<IProductRepository>(
  "ProductRepository",
  ProductRepository,
);

container.registerSingleton<IUserRepository>(
  "UsersRepository",
  UsersRepository,
);

container.registerSingleton<IUserTokenRepository>(
  "UsersTokenRepository",
  UsersTokensRepository,
);
