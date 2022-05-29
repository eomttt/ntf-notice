/* eslint-disable class-methods-use-this */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { reviveDateTime } from 'libs/date';

// type HttpOptions = {
//   refreshTokenUrl?: string;
//   csrfTokenUrl?: string;
// };

export class Http {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      headers: {
        'content-type': 'application/json',
      },
      transformResponse: res => {
        try {
          return JSON.parse(res, reviveDateTime);
        } catch (e) {
          return res;
        }
      },
      responseType: 'json',
      withCredentials: true,
    });
  }

  get<ResponseType>(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<ResponseType>> {
    return this.refreshIfUnauthorized<ResponseType>(
      async (opts?: AxiosRequestConfig) => this.instance.get(url, opts),
      options,
    );
  }

  post<ParamType, ResponseType>(
    url: string,
    param?: ParamType,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse<ResponseType>> {
    return this.refreshIfUnauthorized<ResponseType>(
      async (opts?: AxiosRequestConfig) =>
        this.instance.post(url, param, {
          ...opts,
          headers: { ...opts?.headers },
        }),
      options,
    );
  }

  put<ParamType, ResponseType>(
    url: string,
    param: ParamType,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse<ResponseType>> {
    return this.refreshIfUnauthorized<ResponseType>(
      async (opts?: AxiosRequestConfig) =>
        this.instance.put(url, param, {
          ...opts,
          headers: { ...opts?.headers },
        }),
      options,
    );
  }

  patch<ParamType, ResponseType>(
    url: string,
    param: ParamType,
    options?: AxiosRequestConfig,
  ): Promise<AxiosResponse<ResponseType>> {
    return this.refreshIfUnauthorized<ResponseType>(
      async (opts?: AxiosRequestConfig) =>
        this.instance.patch(url, param, {
          ...opts,
          headers: { ...opts?.headers },
        }),
      options,
    );
  }

  delete<ResponseType>(url: string, options?: AxiosRequestConfig): Promise<AxiosResponse<ResponseType>> {
    return this.refreshIfUnauthorized<ResponseType>(
      async () =>
        this.instance.delete(url, {
          ...options,
          headers: { ...options?.headers },
        }),
      options,
    );
  }

  // async getCsrfToken(options?: AxiosRequestConfig) {
  //   if (!this.options.csrfTokenUrl) {
  //     return '';
  //   }

  //   const { data } = await this.instance.get<CreateCsrfTokenResponseDto>(this.options.csrfTokenUrl, options);
  //   return data.csrfToken;
  // }

  // async refreshToken(options?: AxiosRequestConfig): Promise<AxiosResponse<RefreshTokenResponseDto>> {
  //   assert(this.options.refreshTokenUrl);
  //   return this.instance.post(
  //     this.options.refreshTokenUrl,
  //     {},
  //     {
  //       ...options,
  //       headers: { ...options?.headers, 'csrf-token': await this.getCsrfToken(options) },
  //     },
  //   );
  // }

  private async refreshIfUnauthorized<ResponseType>(
    handler: (opts?: AxiosRequestConfig) => Promise<AxiosResponse<ResponseType>>,
    options?: AxiosRequestConfig,
  ) {
    return handler(options);
  }
}
