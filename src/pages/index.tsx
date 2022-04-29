import { Layout } from 'components/Layout';
import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => (
  <Layout>
    <h1 className="w-full text-center text-6xl font-bold text-black-500 pt-20">NFT NOTICE</h1>
    <h2 className="w-full text-center text-3xl font-bold my-10 pb-24">원하는 NFT 프로젝트 맞춤 알림 서비스</h2>
    <div className="w-full text-center">
      <Link href="/subscribe">
        <button className="bg-gray-300 hover:bg-gray-400 w-32 h-10 rounded-md ">구독하기</button>
      </Link>
    </div>
    <div className="w-full text-center pt-8">
      <Link href="/subscribe_manage">
        <button className="bg-gray-300 hover:bg-gray-400 w-32 h-10 rounded-md">구독변경</button>
      </Link>
    </div>
    <div className="w-full text-center pt-8">
      <Link href="/project_login">
        <button className="bg-gray-300 hover:bg-gray-400 w-32 h-10 rounded-md">프로젝트 로그인</button>
      </Link>
    </div>
    <div className="w-full text-center pt-24 text-black underline">
      <Link href="/temporary">문의: jason@nftnotice.com</Link>
    </div>
  </Layout>
);

export default Home;
