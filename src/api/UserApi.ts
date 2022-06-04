import { BaseApi } from 'api/BaseApi';
import { AxiosRequestConfig } from 'axios';

export type User = {
  email: string;
};

export class UserApi extends BaseApi {
  static getUser(options?: AxiosRequestConfig) {
    return this.http.get<User>(`${this.url}/user`, options);
  }
}
