import { IAlbum } from "./Album";
import { IUsers } from "./User";

export class IMain {
  album: IAlbum;
  user: IUsers | null;
  constructor(album: IAlbum, user: IUsers | null) {
    this.album = album;
    this.user = user;
  }
}
