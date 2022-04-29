import { Layout } from 'components/Layout';
import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => (
  <Layout>
    <h1 className="w-full text-center text-6xl font-bold text-black-500 pt-10">NFT NOTICE</h1>
    <h2 className="w-full text-center text-3xl font-bold my-10">원하는 NFT 프로젝트 맞춤 알림 서비스</h2>
  </Layout>
);

export default Home;
