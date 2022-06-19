import { Button } from 'components/Button';
import { Layout } from 'components/Layout';
import { Loading } from 'components/Loading';
import { useMutateLogout } from 'hooks/useMutateLogout';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Logout = () => {
  const router = useRouter();
  const { logout } = useMutateLogout();

  const [isLogOut, setIsLogOut] = useState(false);

  useEffect(() => {
    logout()
      .then(() => setIsLogOut(true))
      .catch(() => {
        // Nothing
      });
  }, [logout, router]);

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
        <p className="my-10">{isLogOut ? '로그아웃 되었습니다.' : '로그아웃 중입니다.'}</p>
        {isLogOut && (
          <Button
            type="button"
            label="홈으로"
            onClick={() => router.replace('/').then(() => window.location.reload())}
          />
        )}
      </div>
    </Layout>
  );
};

export default Logout;
