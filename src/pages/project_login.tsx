import { Layout } from 'components/Layout';
import type { NextPage } from 'next';
import { FaRegEnvelope } from 'react-icons/fa';
import Link from 'next/link';

const Home: NextPage = () => (
  <Layout>
    <h1 className="w-full text-center text-6xl font-bold text-black-500 pt-20">프로젝트 로그인</h1>
    <div className="flex items-center justify-center">
      <div className="border-2 border-gray-300 h-10 w-64 p-2 flex items-center rounded-md mt-28">
        <FaRegEnvelope className="text-gray-500 ml-1 mr-2" />
        <input
          type="email"
          name="email"
          placeholder="프로젝트 비밀번호 입력"
          className="placeholder:text-gray-500 outline-none text-md flex-1"
        />
      </div>
      <div className="pl-2">
        <Link href="/temporary">
          <button className="bg-gray-600 text-white hover:bg-gray-400 w-24 h-10 rounded-md mt-28">로그인</button>
        </Link>
      </div>
    </div>
    <div className="w-full text-center mt-32">
      <p className="underline">프로젝트를 아직 등록하지 않으셨나요?</p>
      <Link href="/temporary">
        <button className="bg-gray-600 text-white hover:bg-gray-400 w-36 h-10 rounded-md mt-8 ">
          프로젝트 등록신청
        </button>
      </Link>
    </div>
  </Layout>
);

export default Home;
