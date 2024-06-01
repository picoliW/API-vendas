import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import { IProduct } from "./IProduct";

export interface IRequest {
  customer: Customer;
  products: IProduct[];
}
