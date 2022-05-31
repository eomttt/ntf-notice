import { Http } from 'libs/Http';

export class BaseApi {
  static get url() {
    if (typeof window === 'undefined') {
      // Server 인 경우
      return process.env.NEXT_PUBLIC_DIRITTO_API_URL;
    }
    return '/api';
  }

  static http = new Http();
}
