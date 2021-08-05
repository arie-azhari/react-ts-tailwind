export class IAlbum {
  userid: number;
  id: number;
  title: string;
  constructor(userid: number, id: number, title: string) {
    this.userid = userid;
    this.id = id;
    this.title = title;
  }
}
