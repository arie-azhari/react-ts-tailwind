import { AxiosResponse } from "axios";
import { IPhoto } from "../../entities/Photo";

export class PhotoDataMapper {
  public convertPhotoDataFromApi(result: AxiosResponse<any>): IPhoto[] {
    const { data } = result;
    return data.map(
      (e: any) =>
        new IPhoto(
          e.albumId,
          e.id,
          e.title,
          e.url,
          e.thumbnailUrl,
          false,
          null,
          false
        )
    );
  }
}
