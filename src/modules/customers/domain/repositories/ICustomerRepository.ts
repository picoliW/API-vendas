import Customer from "@modules/customers/infra/typeorm/entities/Customer";
import { ICreateCustomer } from "../models/ICreateCustomer";
import { ICustomer } from "../models/ICustomer";

export interface ICustomersRepository {
  findByName(name: string): Promise<ICustomer | undefined>;
  findById(id: string): Promise<ICustomer | undefined>;
  findByEmail(email: string): Promise<ICustomer | undefined>;
  create(data: ICreateCustomer): Promise<ICustomer>;
  save(customer: ICustomer): Promise<ICustomer>;
  createQueryBuilder(
    alias?: string,
  ): import("typeorm").SelectQueryBuilder<ICustomer>;
  remove(customer: Customer): Promise<void>;
}
