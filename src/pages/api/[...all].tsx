import { NextApiRequest, NextApiResponse } from 'next';
import httpProxyMiddleware from 'next-http-proxy-middleware';

// https://github.com/stegano/next-http-proxy-middleware/issues/33
export const config = {
  api: {
    bodyParser: false,
  },
};

export default (req: NextApiRequest, res: NextApiResponse) =>
  httpProxyMiddleware(req, res, {
    target: process.env.NEXT_PUBLIC_DIRITTO_API_URL,
    pathRewrite: [
      {
        patternStr: '^/api/',
        replaceStr: '/',
      },
    ],
    secure: process.env.ENVIRONMENT !== 'local',
  });
