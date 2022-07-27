import { User, UserApi } from 'api/UserApi';
import { Layout } from 'components/Layout';
import { SubscribeProjects } from 'components/SubscribeProjects';
import { SubscribeProjectsUpdate } from 'components/SubscribeProjectsUpdate';
import { Title } from 'components/Title';
import { getSSRAuthOptions } from 'libs/ssrOptions';
import { NextPageContext } from 'next';
import { useMemo } from 'react';
import useSWR from 'swr';

const HomePage = ({ user }: { user: User }) => {
  const { data: userData } = useSWR('/api/user', () => UserApi.getUser());

  const isLoggedIn = useMemo(() => userData?.data.email || user?.email, [userData?.data.email, user?.email]);

  if (isLoggedIn) {
    return (
      <Layout>
        <Title />
        <SubscribeProjectsUpdate email={userData?.data.email || user.email} />
      </Layout>
    );
  }

  return (
    <Layout>
      <Title />
      <h2 className="w-full text-center text-l my-5">
        원하는!!!! <span className="font-bold text-primary">NFT</span> 프로젝트만 골라서 이벤트 알림받기
      </h2>
      <section className="mt-5">
        <SubscribeProjects />
      </section>
    </Layout>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  try {
    const userData = await UserApi.getUser(getSSRAuthOptions(ctx));

    return {
      props: {
        user: userData.data,
      },
    };
  } catch {
    return {
      props: {},
    };
  }
}

export default HomePage;
