import { AxiosRequestConfig } from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';

export const getSSRAuthOptions = (ctx: NextPageContext | GetServerSidePropsContext): AxiosRequestConfig => ({
  headers: {
    ...(ctx?.req?.headers.cookie ? { cookie: ctx.req.headers.cookie } : {}),
  },
  withCredentials: true,
});
