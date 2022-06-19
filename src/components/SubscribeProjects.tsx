import { AxiosError } from 'axios';
import { Button } from 'components/Button';
import { InputEmailFrom } from 'components/InputEmailForm';
import { Loading } from 'components/Loading';
import { SelectProjects } from 'components/SelectProjects';
import { ModalType } from 'constants/modal';
import { useGetProjects } from 'hooks/useGetProjects';
import { useMutateSubscribe } from 'hooks/useMutateSubscribe';
import { useCallback, useState } from 'react';
import { ModalService } from 'services/ModalService';

export const SubscribeProjects = () => {
  const [email, setEmail] = useState<string>('');
  const [projectItemIds, setProjectItemIds] = useState<number[]>([]);
  const [proposeProjects, setProposeProjects] = useState<string>('');

  const { projectItems, selectedProjectMap, isLoading, addSelected, removeSelected } = useGetProjects();

  const { subscribeProject, isLoading: isLoadingMutate } = useMutateSubscribe(
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
      ModalService.show(ModalType.Alert, {
        title: '최소 한개 이상의 프로젝트를 선택해주세요. ',
      });

      return;
    }

    await subscribeProject({ email, projectIds: projectItemIds, optionProjects });
  }, [email, projectItemIds, proposeProjects, subscribeProject]);

  return (
    <>
      <InputEmailFrom disabled={!!email} onSubmit={setEmail} />
      {email && (
        <>
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
          <Button
            className="mt-5 w-full"
            type="button"
            disabled={isLoadingMutate}
            label={isLoadingMutate ? <Loading color="black" height="2rem" width="2rem" /> : '구독 신청'}
            onClick={handleSubscribe}
          />
        </>
      )}
    </>
  );
};
