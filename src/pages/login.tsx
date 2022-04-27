import { Layout } from 'components/Layout';
import type { NextPage } from 'next';
import { useState } from 'react';

const Login: NextPage = () => {
  const [count, setCount] = useState(0);

  return (
    <Layout>
      <div>Login Page!!</div>
      <div>{count}</div>
      <button type="button" onClick={() => setCount(count + 1)}>
        아무거나 넣으셈
      </button>
    </Layout>
  );
};

export default Login;
