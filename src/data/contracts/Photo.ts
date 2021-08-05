import { IPhoto } from "../../entities/Photo";

export interface PhotoRepositoryInterface {
  getAllPhotos(): Promise<IPhoto[]>;
}
