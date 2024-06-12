import User from "@modules/users/infra/typeorm/entities/User";
import { ICreateUser } from "../models/ICreateUser";

export interface IUsersRepository {
  findByName(name: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create({ name, email, password }: ICreateUser): Promise<User>;
  save(user: User): Promise<User>;
  find(): Promise<User[]>;
}
