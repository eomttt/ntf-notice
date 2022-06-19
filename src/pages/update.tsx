import { User, UserApi } from 'api/UserApi';
import { AxiosError } from 'axios';
import { InputEmailFrom } from 'components/InputEmailForm';
import { Layout } from 'components/Layout';
import { Title } from 'components/Title';
import { ModalType } from 'constants/modal';
import { useGetUser } from 'hooks/useGetUser';
import { useMutateSendAuthEmail } from 'hooks/useMutateSendAuthEmail';
import { getSSRAuthOptions } from 'libs/ssrOptions';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ModalService } from 'services/ModalService';

const UpdatePage = ({ user }: { user: User }) => {
  const router = useRouter();
  const [email, setEmail] = useState<string>('');
  const { data } = useGetUser();

  const isLoggedIn = useMemo(() => data?.data.email || user?.email, [data?.data.email, user?.email]);

  const { sendEmail, isLoading: isLoadingSendAuthEmail } = useMutateSendAuthEmail();

  const handleCheckEmail = useCallback(
    async (inputEmail: string) => {
      try {
        setEmail(inputEmail);
        await UserApi.checkEmail(inputEmail);
        await sendEmail(inputEmail);

        ModalService.show(ModalType.Alert, {
          title: '인증 메일을 보냈습니다. 메일을 확인해주세요.',
          onConfirm: () => window.location.reload(),
        });
      } catch (e) {
        if ((e as AxiosError)?.response?.status === 404) {
          ModalService.show(ModalType.Alert, {
            title: '존재하지 않는 이메일 입니다. 먼저 가입을 해주세요.',
            onConfirm: () => router.replace('/'),
          });
          return;
        }

        ModalService.show(ModalType.Alert, {
          title: '에러가 발생했습니다. 잠시 후 다시 시도해주세요.',
        });
        setEmail('');
      }
    },
    [router, sendEmail],
  );

  useEffect(() => {
    if (isLoggedIn) {
      router.replace('/');
    }
  }, [isLoggedIn, router]);

  return (
    <Layout>
      <Title />
      <h2 className="w-full text-center text-l my-5">이메일 인증하고 구독리스트를 변경해보세요.</h2>
      <section className="mt-5">
        <InputEmailFrom label="인증하기" disabled={isLoadingSendAuthEmail || !!email} onSubmit={handleCheckEmail} />
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

export default UpdatePage;
