import { BaseApi } from 'api/BaseApi';

export class UserApi extends BaseApi {
  static getUser() {
    return this.http.get(`${this.url}/user`);
  }
}
