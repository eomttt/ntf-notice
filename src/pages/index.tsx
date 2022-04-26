import { Layout } from 'components/Layout';
import { SubscriptionForm } from 'components/SubscriptionForm';
import type { NextPage } from 'next';

const Home: NextPage = () => (
  <Layout>
    <h1 className="w-full text-right text-3xl font-bold text-cyan-500">NFT</h1>
    <h1 className="w-full text-right text-3xl font-bold">NOTICE</h1>
    <h2 className="w-full text-center text-xl my-5">
      원하는 <span className="font-bold text-cyan-500">NFT</span> 프로젝트만 골라서 이벤트 알림받기
    </h2>
    <section className="mt-5">
      <SubscriptionForm />
    </section>
  </Layout>
);

export default Home;
