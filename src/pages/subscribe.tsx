import { Layout } from 'components/Layout';
import type { NextPage } from 'next';
import { FaRegEnvelope } from 'react-icons/fa';
import Link from 'next/link';

const Home: NextPage = () => (
  <Layout>
    <h1 className="w-full text-center text-6xl font-bold text-black-500 pt-20">NFT NOTICE</h1>
    <h2 className="w-full text-center text-3xl font-bold my-10 pb-24">원하는 NFT 프로젝트 맞춤 알림 서비스</h2>{' '}
    <div className="flex items-center justify-center">
      <div className="border-2 border-gray-300 h-10 w-64 p-2 flex items-center rounded-md">
        <FaRegEnvelope className="text-gray-500 ml-1 mr-2" />
        <input
          type="email"
          name="email"
          placeholder="이메일을 입력해주세요"
          className="placeholder:text-gray-500 outline-none text-md flex-1"
        />
      </div>
      <div className="pl-2">
        <Link href="/temporary">
          <button className="bg-gray-600 text-white hover:bg-gray-400 w-24 h-10 rounded-md ">구독하기</button>
        </Link>
      </div>
    </div>
    <div className="w-full text-center pt-24 text-black underline">
      <Link href="/">메인 홈페이지</Link>
    </div>
  </Layout>
);

export default Home;
