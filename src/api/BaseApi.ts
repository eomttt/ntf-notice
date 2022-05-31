import { Http } from 'libs/Http';

export class BaseApi {
  static get url() {
    return process.env.NEXT_PUBLIC_DIRITTO_API_URL;
  }

  static http = new Http();
}
