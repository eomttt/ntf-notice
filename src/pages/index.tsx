import { AxiosError } from 'axios';
import { Button } from 'components/Button';
import { InputEmailFrom } from 'components/InputEmailForm';
import { Layout } from 'components/Layout';
import { Loading } from 'components/Loading';
import { SelectProjects } from 'components/SelectProjects';
import { useSubscribe } from 'hooks/useSubscribe';
import type { NextPage } from 'next';
import { useCallback, useState } from 'react';

const Home: NextPage = () => {
  const [email, setEmail] = useState<string>('');
  const [projectItemIds, setProjectItemIds] = useState<number[]>([]);
  const [proposeProjects, setProposeProjects] = useState<string>('');

  const { subscribeProject, isLoading } = useSubscribe(
    () => {
      alert('구독 신청이 완료 되었습니다. 메일을 확인해주세요.');
      window.location.reload();
    },
    (e: AxiosError) => {
      if ((e as AxiosError).response?.status === 400) {
        alert('이미 구독 신청을 하셨습니다.');
      }
    },
  );

  const handleSubscribe = useCallback(async () => {
    const optionProjects = proposeProjects.split(',');

    if (projectItemIds.length === 0 && !proposeProjects) {
      alert('최소 한개 이상의 프로젝트를 선택해주세요.');
      return;
    }

    await subscribeProject({ email, projectIds: projectItemIds, optionProjects });
  }, [email, projectItemIds, proposeProjects, subscribeProject]);

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
      <h2 className="w-full text-center text-l my-5">
        원하는!!!! <span className="font-bold text-primary">NFT</span> 프로젝트만 골라서 이벤트 알림받기
      </h2>
      <section className="mt-5">
        {!email && <InputEmailFrom onSubmit={setEmail} />}
        {email && (
          <>
            <SelectProjects
              className="mt-8 w-full"
              onChange={setProjectItemIds}
              onChangeProposeProjects={setProposeProjects}
            />
            {isLoading ? (
              <div className="flex items-center justify-center min-w-24 h-12 rounded-lg border-2 border-black bg-primary mt-5 w-full">
                <Loading color="black" height="2rem" width="2rem" />
              </div>
            ) : (
              <Button
                className="mt-5 w-full"
                type="button"
                disabled={isLoading}
                label="구독신청"
                onClick={handleSubscribe}
              />
            )}
          </>
        )}
      </section>
    </Layout>
  );
};

export default Home;
