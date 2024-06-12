import { container } from "tsyringe";
import { ICustomersRepository } from "@modules/customers/domain/repositories/ICustomerRepository";
import CustomersRepository from "@modules/customers/infra/typeorm/repositories/CustomersRepository";
import { IOrderRepository } from "@modules/orders/domain/repositories/IOrdersRepostory";
import { OrdersRepository } from "@modules/orders/infra/typeorm/repositories/OrdersRepository";
import { IProductRepository } from "@modules/products/domain/repositories/IProductRepository";
import { ProductRepository } from "@modules/products/infra/typeorm/repositories/ProductsRepositorie";
import "reflect-metadata";
import { IUsersRepository } from "@modules/users/domain/repositories/IUsersRepository";
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository";
import { IUsersTokensRepository } from "@modules/users/domain/repositories/IUsersTokenRepository";
import UsersTokensRepository from "@modules/users/infra/typeorm/repositories/UserTokensRepository";
import "@modules/users/providers";

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

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository,
);

container.registerSingleton<IUsersTokensRepository>(
  "UsersTokenRepository",
  UsersTokensRepository,
);
