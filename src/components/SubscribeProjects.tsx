/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { UserApi } from 'api/UserApi';
import { AxiosError } from 'axios';
import { Button } from 'components/Button';
import { InputEmailFrom } from 'components/InputEmailForm';
import { Loading } from 'components/Loading';
import { SelectProjects } from 'components/SelectProjects';
import { ModalType } from 'constants/modal';
import { useMutateSendAuthEmail } from 'hooks/useMutateSendAuthEmail';
import { useMutateSubscribe } from 'hooks/useMutateSubscribe';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { ModalService } from 'services/ModalService';

export const SubscribeProjects = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [proposeProjects, setProposeProjects] = useState<string>('');

  const { sendEmail, isLoading: isLoadingSendAuthEmail } = useMutateSendAuthEmail();

  const { subscribeProject, isLoading: isLoadingSubscribe } = useMutateSubscribe(
    () => {
      ModalService.show(ModalType.Alert, {
        title: '구독 신청이 완료 되었습니다. 메일을 확인해주세요.',
        onConfirm: () => window.location.reload(),
      });
    },
    (e: AxiosError) => {
      if ((e as AxiosError).response?.status === 400) {
        ModalService.show(ModalType.Alert, {
          title: '이미 구독 신청을 하셨습니다.',
        });
      }
    },
  );

  const sendAuthEmail = useCallback(
    async (inputEmail: string) => {
      try {
        await sendEmail(inputEmail);
        setTimeout(() => {
          ModalService.show(ModalType.Alert, {
            title: '인증 메일을 보냈습니다. 메일을 확인해주세요.',
            onConfirm: () => window.location.reload(),
          });
        });
      } catch {
        ModalService.show(ModalType.Alert, {
          title: '에러가 발생했습니다. 잠시 후 다시 시도해주세요.',
        });
      }
    },
    [sendEmail],
  );

  const handleCheckEmail = useCallback(
    async (inputEmail: string) => {
      try {
        await UserApi.checkEmail(inputEmail);

        ModalService.show(ModalType.Alert, {
          title: '이미 구독한 이메일 입니다. 구독을 변경 하시겠습니까?',
          confirmText: '구독 변경 하기',
          onConfirm: () => sendAuthEmail(inputEmail),
          cancelText: '취소',
        });
      } catch (e) {
        if ((e as AxiosError)?.response?.status === 404) {
          // 이메일이 존재하지 않는 경우만 가입
          setEmail(inputEmail);
        }
      }
    },
    [sendAuthEmail],
  );

  const handleSubscribe = useCallback(async () => {
    const optionProjects = proposeProjects.split(',');

    if (selectedIds.length === 0 && !proposeProjects) {
      ModalService.show(ModalType.Alert, {
        title: '최소 한개 이상의 프로젝트를 선택해주세요.',
      });

      return;
    }

    await subscribeProject({ email, projectIds: selectedIds, optionProjects });
  }, [email, selectedIds, proposeProjects, subscribeProject]);

  return (
    <>
      <InputEmailFrom label="구독하기" disabled={isLoadingSendAuthEmail || !!email} onSubmit={handleCheckEmail} />
      {email && (
        <>
          <SelectProjects
            className="mt-8 w-full"
            onChange={setSelectedIds}
            onChangeProposeProjects={setProposeProjects}
          />
          <Button
            className="mt-5 w-full"
            type="button"
            disabled={isLoadingSubscribe}
            label={isLoadingSubscribe ? <Loading color="black" height="2rem" width="2rem" /> : '구독 신청'}
            onClick={handleSubscribe}
          />
        </>
      )}
      {!email && (
        <p className="underline text-center cursor-pointer mt-5" onClick={() => router.push('/update')}>
          구독 변경하기
        </p>
      )}
    </>
  );
};
