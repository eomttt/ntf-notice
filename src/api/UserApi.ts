import { BaseApi } from 'api/BaseApi';
import { AxiosRequestConfig } from 'axios';

export type User = {
  email: string;
};

export class UserApi extends BaseApi {
  static logOut() {
    return this.http.post(`${this.url}/logout`);
  }

  static getUser(options?: AxiosRequestConfig) {
    return this.http.get<User>(`${this.url}/user`, options);
  }
}
