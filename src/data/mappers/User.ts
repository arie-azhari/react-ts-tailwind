import { IUsers, IAddress, ICompany, IGeo } from "../../entities/User";
import { AxiosResponse } from "axios";

export class UserDataMapper {
  public convertUserDataFromApi(result: AxiosResponse<any>): IUsers[] {
    const { data } = result;
    return data.map(
      (e: any) =>
        new IUsers(
          e.id,
          e.name,
          e.username,
          e.email,
          new IAddress(
            e.address.street,
            e.address.suite,
            e.address.city,
            e.address.zipcode,
            new IGeo(e.address.geo.lat, e.address.geo.lng)
          ),
          e.phone,
          e.website,
          new ICompany(e.company.name, e.company.catchPhrase, e.company.bs)
        )
    );
  }

  public convertUserByIdFromApi(result: AxiosResponse<any>): IUsers {
    const { data } = result;
    return new IUsers(
      data.id,
      data.name,
      data.username,
      data.email,
      new IAddress(
        data.address.street,
        data.address.suite,
        data.address.city,
        data.address.zipcode,
        new IGeo(data.address.geo.lat, data.address.geo.lng)
      ),
      data.phone,
      data.website,
      new ICompany(data.company.name, data.company.catchPhrase, data.company.bs)
    );
  }
}
