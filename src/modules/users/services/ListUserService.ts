import UsersRepository from "../infra/typeorm/repositories/UsersRepository";
import User from "../infra/typeorm/entities/User";
import { inject, injectable } from "tsyringe";

@injectable()
class ListUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository,
  ) {}
  public async execute(): Promise<User[]> {
    const users = this.usersRepository.find();

    return users;
  }
}

export default ListUserService;
