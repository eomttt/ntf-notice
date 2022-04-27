import { CountButton } from 'components/CountButton';
import { Layout } from 'components/Layout';
import type { NextPage } from 'next';

const Login: NextPage = () => (
  <Layout>
    <div>Login Page!!</div>
    <CountButton initial={130} />
  </Layout>
);

export default Login;
