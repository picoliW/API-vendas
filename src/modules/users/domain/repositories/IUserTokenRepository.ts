import UserToken from "@modules/users/infra/typeorm/entities/UserToken";

export interface IUserTokenRepository {
  findByToken(token: string): Promise<UserToken | undefined>;
  generate(user_id: string): Promise<UserToken>;
}
