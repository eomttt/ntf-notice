import { Layout } from 'components/Layout';
import { Loading } from 'components/Loading';
import { useMutateConfirmSubscribe } from 'hooks/useMutateConfirmSubscribe';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Confirm = () => {
  const router = useRouter();
  const { isError, isLoading, data, confirmSubscribe } = useMutateConfirmSubscribe();

  useEffect(() => {
    if (router.query.token) {
      confirmSubscribe(router.query.token as string);
    }
  }, [confirmSubscribe, router.query.token]);

  useEffect(() => {
    if (isError) {
      alert('문제가 발생 했습니다. 다시 인증 시도해주세요.');
      router.replace('/');
    }
  }, [isError, router]);

  useEffect(() => {
    if (data && !isLoading) {
      alert('인증이 완료 되었습니다.');
      router.replace('/');
    }
  }, [data, isLoading, router]);

  return (
    <Layout>
      <div className="flex items-center justify-center">
        <img
          className="w-10 h-auto"
          alt="logo"
          src="https://user-images.githubusercontent.com/22593217/171372114-49693c06-8e2a-4502-aee7-d6b79d2f983a.jpeg"
        />
        <h1 className="text-right font-bold text-primary mr-2 text-5xl">NFT</h1>
        <h1 className="text-right font-bold text-5xl">NOTICE</h1>
        <img
          className="w-10 h-auto"
          alt="logo"
          src="https://user-images.githubusercontent.com/22593217/171372114-49693c06-8e2a-4502-aee7-d6b79d2f983a.jpeg"
        />
      </div>
      <div className="mt-40 flex flex-col items-center justify-center">
        <Loading width="100px" height="100px" />
        <p className="mt-10">메일 확인 중입니다. 잠시만 기다려주세요.</p>
      </div>
    </Layout>
  );
};

export default Confirm;
