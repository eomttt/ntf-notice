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

  static sendEmail(email: string) {
    return this.http.post(`${this.url}/user/send-email`, { email });
  }

  static checkEmail(email: string) {
    return this.http.get(`${this.url}/user/check-email?email=${email}`);
  }

  static authentication(data: { token: string }) {
    return this.http.post<{ token: string }, object>(`${this.url}/user/auth`, data);
  }
}
