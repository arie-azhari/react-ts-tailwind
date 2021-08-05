import { injectable } from "tsyringe";
import { PhotoApiRepository } from "../../app/repository/api/PhotoApiRepository";
import { IPhoto } from "../../entities/Photo";

@injectable()
export class PhotoPresenter {
  private repository: PhotoApiRepository;
  constructor(repository: PhotoApiRepository) {
    this.repository = repository;
  }

  public getAllPhotoPresenter(): Promise<IPhoto[]> {
    return this.repository.getAllPhotos();
  }
}
