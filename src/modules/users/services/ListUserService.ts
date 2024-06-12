import User from "../infra/typeorm/entities/User";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../domain/repositories/IUsersRepository";

@injectable()
class ListUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}
  public async execute(): Promise<User[]> {
    const users = this.usersRepository.find();

    return users;
  }
}

export default ListUserService;
