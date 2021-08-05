import { injectable } from "tsyringe";
import { UserApiRepository } from "../../app/repository/api/UserApiRepository";
import { IUsers } from "../../entities/User";

@injectable()
export class UserPresenter {
  private repository: UserApiRepository;
  constructor(repository: UserApiRepository) {
    this.repository = repository;
  }

  public getAllUsersPresenter(): Promise<IUsers[]> {
    return this.repository.getAllusers();
  }

  public getUserByIdPresenter(userId: number): Promise<IUsers> {
    return this.repository.getUserById(userId);
  }
}
