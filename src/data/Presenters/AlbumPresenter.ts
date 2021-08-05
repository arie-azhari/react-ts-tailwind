import { injectable } from "tsyringe";
import { AlbumApiRepository } from "../../app/repository/api/AlbumApiRepository";
import { IAlbum } from "../../entities/Album";

@injectable()
export class AlbumPresenter {
  private repository: AlbumApiRepository;
  constructor(repository: AlbumApiRepository) {
    this.repository = repository;
  }

  public getAllAlbumPresenter(): Promise<IAlbum[]> {
    return this.repository.getAllAlbums();
  }

  public getAlbumByIdPresenter(albumId: number): Promise<IAlbum> {
    return this.repository.getAlbumById(albumId);
  }
}
