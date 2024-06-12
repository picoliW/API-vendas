import UserToken from "@modules/users/infra/typeorm/entities/UserToken";

export interface IUsersTokensRepository {
  findByToken(token: string): Promise<UserToken | undefined>;
  generate(user_id: string): Promise<UserToken>;
}
