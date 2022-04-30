import { Layout } from 'components/Layout';
import type { NextPage } from 'next';
import Link from 'next/link';
import { TiLockClosed } from 'react-icons/ti';
import { GoPrimitiveDot } from 'react-icons/go';

const Home: NextPage = () => (
  <Layout>
    <h1 className="w-full text-center text-6xl font-bold text-black-500 pt-20">구독관리</h1>
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <div className="flex h-10 w-28 mt-8 items-center">이메일 변경</div>
        <div className="border-2 border-gray-300 h-10 w-64 p-2 mt-8 flex items-center rounded-md">
          <input
            type="email"
            name="email"
            placeholder="변경할 이메일 입력"
            className="placeholder:text-gray-500 outline-none text-md flex-1"
          />
          <TiLockClosed className="text-gray-500 ml-1 mr-2" />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex h-10 w-28 mt-4 items-center">비밀번호 변경</div>
        <div className="border-2 border-gray-300 h-10 w-64 p-2 mt-4 flex items-center rounded-md">
          <input
            type="email"
            name="email"
            placeholder="4자리 입력(옵션사항)"
            className="placeholder:text-gray-500 outline-none items-center flex-1"
          />
          <TiLockClosed className="text-gray-500 ml-1 mr-2" />
        </div>
      </div>
      <div>
        <Link href="/temporary">
          <button className="bg-gray-600 text-white hover:bg-gray-400 w-24 h-10 mt-20 rounded-md ">저장하기</button>
        </Link>
      </div>
      <div className="w-full text-center pt-24 text-black underline">
        <Link href="/">메인 홈페이지</Link>
      </div>
    </div>
  </Layout>
);

export default Home;
