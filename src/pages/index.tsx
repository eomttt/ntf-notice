import { ProjectApi } from 'api/ProjectApi';
import { AxiosError } from 'axios';
import { Button } from 'components/Button';
import { InputEmailFrom } from 'components/InputEmailForm';
import { Layout } from 'components/Layout';
import { SelectProjects } from 'components/SelectProjects';
import type { NextPage } from 'next';
import { useCallback, useState } from 'react';

const Home: NextPage = () => {
  const [email, setEmail] = useState<string>('');
  const [projectItemIds, setProjectItemIds] = useState<number[]>([]);
  const [proposeProjects, setProposeProjects] = useState<string>('');

  const handleSubscribe = useCallback(async () => {
    const optionProjects = proposeProjects.split(',');

    if (projectItemIds.length === 0 && !proposeProjects) {
      alert('최소 한개 이상의 프로젝트를 선택해주세요.');
      return;
    }

    try {
      await ProjectApi.subscribeProjects({
        email,
        projectIds: projectItemIds,
        optionProjects,
      });
      alert('구독 신청이 완료 되었습니다. 메일을 확인해주세요.');
      window.location.reload();
    } catch (e) {
      if ((e as AxiosError).response?.status === 400) {
        alert('이미 구독 신청을 하셨습니다.');
      }
      // TODO: Error handling
    }
  }, [email, projectItemIds, proposeProjects]);

  return (
    <Layout>
      <div className="flex align-middle justify-center">
        <h1 className="text-right font-bold text-cyan-500 mr-2 text-5xl">NFT</h1>
        <h1 className="text-right font-bold text-5xl">NOTICE</h1>
      </div>
      <h2 className="w-full text-center text-l my-5">
        원하는!!!! <span className="font-bold text-cyan-500">NFT</span> 프로젝트만 골라서 이벤트 알림받기
      </h2>
      <section className="mt-5">
        <InputEmailFrom onSubmit={setEmail} />
        {email && (
          <>
            <SelectProjects
              className="mt-8 w-full"
              onChange={setProjectItemIds}
              onChangeProposeProjects={setProposeProjects}
            />
            <Button className="mt-5 w-full" type="button" label="구독신청" onClick={handleSubscribe} />
          </>
        )}
      </section>
    </Layout>
  );
};

export default Home;
