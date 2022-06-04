import { Button } from 'components/Button';
import { Loading } from 'components/Loading';
import { SelectProjects } from 'components/SelectProjects';
import { useGetUserSelectedProjects } from 'hooks/useGetUserSelectedProjects';
import { useMutateSubscribeUpdate } from 'hooks/useMutateSubscribeUpdate';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

interface SubscribeProjectsUpdateProps {
  email: string;
}

export const SubscribeProjectsUpdate = ({ email }: SubscribeProjectsUpdateProps) => {
  const router = useRouter();

  const [projectItemIds, setProjectItemIds] = useState<number[]>([]);
  const [proposeProjects, setProposeProjects] = useState<string>('');

  const { projectItems, selectedProjectMap, isLoading, addSelected, removeSelected } = useGetUserSelectedProjects();

  const { isLoading: isLoadingMutate } = useMutateSubscribeUpdate(() => {
    alert('구독 수정이 완료 되었습니다.');
    window.location.reload();
  });

  const handleUpdate = useCallback(async () => {
    console.log('Handle update');
  }, []);

  const handleLogOut = useCallback(() => {
    router.push('/logout');
  }, [router]);

  return (
    <>
      <p className="font-bold text-primary text-center my-5">{email}</p>
      <SelectProjects
        className="mt-8 w-full"
        projectItems={projectItems}
        selectedProjectMap={selectedProjectMap}
        isLoading={isLoading}
        addSelected={addSelected}
        removeSelected={removeSelected}
        onChange={setProjectItemIds}
        onChangeProposeProjects={setProposeProjects}
      />
      <div className="flex justify-between mt-5 gap-5">
        <Button
          className="flex-grow"
          type="button"
          disabled={isLoadingMutate}
          label={isLoadingMutate ? <Loading color="black" height="2rem" width="2rem" /> : '구독 변경'}
          onClick={handleUpdate}
        />
        <Button
          className="flex-grow border-primary bg-white"
          type="button"
          disabled={isLoadingMutate}
          label={isLoadingMutate ? <Loading color="black" height="2rem" width="2rem" /> : '로그아웃'}
          onClick={handleLogOut}
        />
      </div>
    </>
  );
};
