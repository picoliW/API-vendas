import User from "@modules/users/infra/typeorm/entities/User";

export interface IUserRepository {
  findByName(name: string): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
}
