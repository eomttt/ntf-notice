import { Layout } from 'components/Layout';
import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => (
  <Layout>
    <h1 className="w-full text-center text-6xl font-bold text-black-500 pt-20">구독관리</h1>
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center justify-center">
        <div className="flex h-10 w-16 mt-24 items-center mr-2">이메일</div>
        <div className="border-2 border-gray-300 h-10 w-64 p-2 mt-24 flex items-center rounded-md">
          <input
            type="email"
            name="email"
            placeholder="이메일을 입력해주세요"
            className="placeholder:text-gray-500 outline-none text-md flex-1"
          />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex h-10 w-16 mt-4 items-center mr-2">비밀번호</div>
        <div className="border-2 border-gray-300 h-10 w-64 p-2 mt-4 flex items-center rounded-md">
          <input
            type="email"
            name="email"
            placeholder="4자리 입력(옵션사항)"
            className="placeholder:text-gray-500 outline-none text-md flex-1"
          />
        </div>
      </div>
      <div>
        <Link href="/manage">
          <button className="bg-gray-600 text-white hover:bg-gray-400 w-24 h-10 mt-20 rounded-md ">로그인</button>
        </Link>
      </div>
      <div className="w-full text-center pt-24 text-black underline">
        <Link href="/temporary">비밀번호를 잊으셨나요?</Link>
      </div>
    </div>
  </Layout>
);

export default Home;
