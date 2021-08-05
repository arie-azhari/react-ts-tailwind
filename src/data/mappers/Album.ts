import { AxiosResponse } from "axios";
import { IAlbum } from "../../entities/Album";

export class AlbumDataMapper {
  public convertAlbumDataFromApi(result: AxiosResponse<any>): IAlbum[] {
    const { data } = result;
    return data.map((e: any) => new IAlbum(e.userId, e.id, e.title));
  }

  public convertAlbumDetailFromApi(result: AxiosResponse<any>): IAlbum {
    const { data } = result;
    return new IAlbum(data.userId, data.id, data.title);
  }
}
