import { Button } from 'components/Button';
import { InputEmailFrom } from 'components/InputEmailForm';
import { Layout } from 'components/Layout';
import { SelectProjects } from 'components/SelectProjects';
import type { NextPage } from 'next';
import { useCallback, useState } from 'react';

const Home: NextPage = () => {
  const [email, setEmail] = useState<string>();
  const [projectItemIds, setProjectItemIds] = useState<number[]>([]);

  const handleSubscribe = useCallback(() => {
    // TODO: email, 선택된 id 바탕으로 서버에 보내야함
    console.log(email, projectItemIds);
  }, [email, projectItemIds]);

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
            <SelectProjects className="mt-8 w-full" onChange={setProjectItemIds} />
            <Button className="mt-5 w-full" type="button" label="구독신청" onClick={handleSubscribe} />
          </>
        )}
      </section>
    </Layout>
  );
};

export default Home;
