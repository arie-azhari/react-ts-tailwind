import { IUsers } from "../../entities/User";

export interface UserRepositoryInterface {
  getAllusers(): Promise<IUsers[]>;
  getUserById(userId: number): Promise<IUsers>;
}
