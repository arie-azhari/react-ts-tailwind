export class IUsers {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
  website: string;
  company: ICompany;
  constructor(
    id: number,
    name: string,
    username: string,
    email: string,
    address: IAddress,
    phone: string,
    website: string,
    company: ICompany
  ) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.email = email;
    this.address = address;
    this.phone = phone;
    this.website = website;
    this.company = company;
  }
}

export class IGeo {
  lat: string;
  lng: string;
  constructor(lat: string, lng: string) {
    this.lat = lat;
    this.lng = lng;
  }
}

export class IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
  constructor(
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: IGeo
  ) {
    this.street = street;
    this.suite = suite;
    this.city = city;
    this.zipcode = zipcode;
    this.geo = geo;
  }
}

export class ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
  constructor(name: string, catchPhrase: string, bs: string) {
    this.name = name;
    this.catchPhrase = catchPhrase;
    this.bs = bs;
  }
}
