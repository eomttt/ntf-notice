/* eslint-disable class-methods-use-this */
import assert from 'assert';
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { reviveDateTime } from 'libs/date';

type HttpOptions = {
  refreshTokenUrl?: string;
  csrfTokenUrl?: string;
};

export class Http {
  private instance: AxiosInstance;

  constructor(private readonly options: HttpOptions = {}) {
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

  async refreshToken(options?: AxiosRequestConfig) {
    assert(this.options.refreshTokenUrl);

    return this.instance.post(
      this.options.refreshTokenUrl,
      {},
      {
        ...options,
        // headers: { ...options?.headers, 'csrf-token': await this.getCsrfToken(options) },
      },
    );
  }

  private isUnauthorizedError(error: unknown) {
    return axios.isAxiosError(error) && error.response && error.response.status === 401;
  }

  private async refreshIfUnauthorized<ResponseType>(
    handler: (opts?: AxiosRequestConfig) => Promise<AxiosResponse<ResponseType>>,
    options?: AxiosRequestConfig,
  ) {
    try {
      return await handler(options);
    } catch (error) {
      if (this.isUnauthorizedError(error) && this.options.refreshTokenUrl) {
        await this.refreshToken(options);
        return await handler(options);
      }
      throw error;
    }
  }
}
