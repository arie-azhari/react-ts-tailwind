export class Endpoints {
    public static baseApiURL = "https://jsonplaceholder.typicode.com";
   
    users(): string {
      return "/users";
    }

    albums(): string {
      return "/albums";
    }

    photos(): string {
      return "/photos";
    }
  }
  