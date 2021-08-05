import React from "react";
import { UserPresenter } from "../../../data/Presenters/UserPresenter";
import { container } from "tsyringe";
import { AlbumPresenter } from "../../../data/Presenters/AlbumPresenter";
import { IAlbum } from "../../../entities/Album";
import { IUsers } from "../../../entities/User";
import { useParams } from "react-router";
import { PhotoPresenter } from "../../../data/Presenters/PhotoPresenter";
import { IPhoto } from "../../../entities/Photo";
import {
  getPhotoFromLocal,
  setPhotoToLocal,
  setCommentToLocal,
  getCommentFromLocal,
} from "../../../app/misc/Storage";

interface IState {
  isLoading: boolean;
  albumDetail: IAlbum | null;
  userDetail: IUsers | null;
  photoDataByAlbumId: IPhoto[];
}

interface InitialState {
  state: IState;
  getData: Function;
  handleSetFavoritePhoto: Function;
  handleChangeInput: Function;
  handleAddComment: Function;
}

const initialState = {
  state: {
    isLoading: true,
    albumDetail: null,
    userDetail: null,
    photoDataByAlbumId: [],
  },
  getData: () => {},
  handleSetFavoritePhoto: () => {},
  handleChangeInput: () => {},
  handleAddComment: () => {},
};
const Context = React.createContext<InitialState>(initialState);
const { Provider: AlbumProvider } = Context;

const Provider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<IState>({
    isLoading: true,
    albumDetail: null,
    userDetail: null,
    photoDataByAlbumId: [],
  });

  const setLoading = (value: boolean) => {
    setState((prevstate) => ({
      ...prevstate,
      isLoading: value,
    }));
  };

  const { id }: any = useParams();

  const albumPresenter = container.resolve(AlbumPresenter);
  const userPresenter = container.resolve(UserPresenter);
  const photoPresenter = container.resolve(PhotoPresenter);

  const getData = async () => {
    setLoading(true);
    try {
      const albumDetail = await albumPresenter.getAlbumByIdPresenter(id);
      const userDetail = await userPresenter.getUserByIdPresenter(
        albumDetail?.userid
      );
      const photosData = await photoPresenter.getAllPhotoPresenter();
      const photoDataByAlbumId = photosData.filter(
        (pht: IPhoto) => pht.albumId === albumDetail?.id
      );

      const favoritePhoto = getPhotoFromLocal();
      const commentDataFromLocal = getCommentFromLocal();
      const photosDataWithFavoriteCheck = photoDataByAlbumId.map(
        (item: IPhoto) => ({
          ...item,
          isFavorite: favoritePhoto.some((pht: number) => pht === item.id),
          comment:
            commentDataFromLocal.find((pht: any) => pht.photoId === item.id)
              ?.comment || null,
          isShowEdit: commentDataFromLocal.some(
            (pht: any) => pht.photoId === item.id
          ),
        })
      );

      setState((prevstate) => ({
        ...prevstate,
        isLoading: false,
        albumDetail,
        userDetail,
        photoDataByAlbumId: photosDataWithFavoriteCheck,
      }));
    } catch (error) {
      setLoading(false);
    }
  };

  const handleSetFavoritePhoto = (photo: IPhoto, idx: number) => {
      const photos = [...state.photoDataByAlbumId];
      photos[idx].isFavorite = !photo.isFavorite;
      setState((prevstate) => ({
        ...prevstate,
        photoDataByAlbumId: photos,
      }));
      setPhotoToLocal(photo.id, photo.isFavorite);
  };

  const handleAddComment = (photo: IPhoto, index: number) => {
    const photos = [...state.photoDataByAlbumId];
    photos[index].isShowEdit = true;
    setState((prevstate) => ({
      ...prevstate,
      photoDataByAlbumId: photos,
    }));
    setCommentToLocal({ photoId: photo.id, value: photo.comment! });
  };

  const handleChangeInput = (value: string, index: number) => {
    const photos = [...state.photoDataByAlbumId];
    photos[index].comment = value;
    setState((prevstate) => ({
      ...prevstate,
      photoDataByAlbumId: photos,
    }));
  };

  return (
    <AlbumProvider
      value={{
        state,
        getData,
        handleSetFavoritePhoto,
        handleChangeInput,
        handleAddComment,
      }}
    >
      {children}
    </AlbumProvider>
  );
};

export const useAlbumContext = () => React.useContext(Context);
// eslint-disable-next-line
export default {
  useAlbumContext,
  Provider,
};
