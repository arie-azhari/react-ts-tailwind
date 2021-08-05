import React from "react";
import { container } from "tsyringe";
import { AlbumPresenter } from "../../../data/Presenters/AlbumPresenter";
import { IAlbum } from "../../../entities/Album";
import { PhotoPresenter } from "../../../data/Presenters/PhotoPresenter";
import { IPhoto } from "../../../entities/Photo";
import { getPhotoFromLocal, setPhotoToLocal } from "../../../app/misc/Storage";
import _ from "lodash";

export interface IAlbumAndPhoto {
  albumData: IAlbum;
  photos: IPhoto[];
}
interface IState {
  isLoading: boolean;
  albumDetailWithFavoritePhotos: IAlbumAndPhoto[];
}

interface InitialState {
  state: IState;
  getData: Function;
  removePhotoFromFavorite: Function;
}

const initialState = {
  state: {
    isLoading: true,
    albumDetailWithFavoritePhotos: [],
  },
  getData: () => {},
  removePhotoFromFavorite: () => {},
};
const Context = React.createContext<InitialState>(initialState);
const { Provider: FavoriteProvider } = Context;

const Provider: React.FC = ({ children }) => {
  const [state, setState] = React.useState<IState>({
    isLoading: true,
    albumDetailWithFavoritePhotos: [],
  });

  const setLoading = (value: boolean) => {
    setState((prevstate) => ({
      ...prevstate,
      isLoading: value,
    }));
  };

  const albumPresenter = container.resolve(AlbumPresenter);
  const photoPresenter = container.resolve(PhotoPresenter);

  const getData = async () => {
    setLoading(true);
    try {
      const favoritePhoto = getPhotoFromLocal();
      const photosData = await photoPresenter.getAllPhotoPresenter();
      const albumData = await albumPresenter.getAllAlbumPresenter();

      const myFavoritePhoto = favoritePhoto.map((item: any) =>
        photosData.find((pht: IPhoto) => pht.id === item)
      );
      const filterUniqPhoto: any = _.uniqBy(myFavoritePhoto, "albumId");
      const myAlbumData = filterUniqPhoto.map((item: IPhoto) =>
        albumData.find((album: IAlbum) => album.id === item.albumId)
      );
      const albumDetailWithFavoritePhotos = myAlbumData.map(
        (album: IAlbum) => ({
          albumData: album,
          photos: myFavoritePhoto.filter(
            (pht: IPhoto) => pht.albumId === album.id
          ),
        })
      );
      setState((prevstate) => ({
        ...prevstate,
        isLoading: false,
        albumDetailWithFavoritePhotos,
      }));
    } catch (error) {
      setLoading(false);
    }
  };

  const removePhotoFromFavorite = (
    index: number,
    indexPhoto: number,
    idPhoto: number
  ) => {
    const data = [...state.albumDetailWithFavoritePhotos];
    data[index].photos.splice(indexPhoto, 1);
    if (data[index].photos.length === 0) {
      data.splice(index, 1);
    }
    setPhotoToLocal(idPhoto, false);
    setState((prevstate) => ({
      ...prevstate,
      albumDetailWithFavoritePhotos: data,
    }));
  };

  return (
    <FavoriteProvider
      value={{
        state,
        getData,
        removePhotoFromFavorite,
      }}
    >
      {children}
    </FavoriteProvider>
  );
};

export const useFavoriteContext = () => React.useContext(Context);
// eslint-disable-next-line
export default {
  useFavoriteContext,
  Provider,
};
