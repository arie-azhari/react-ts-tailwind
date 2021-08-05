import { IAlbum } from "../../entities/Album";

export interface AlbumRepositoryInterface {
  getAllAlbums(): Promise<IAlbum[]>;
  getAlbumById(albumId: number): Promise<IAlbum>;
}
