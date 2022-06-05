import { ProjectApi } from 'api/ProjectApi';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';

export const useMutateSubscribeUpdate = (successCallback: () => void, errorCallback?: (e: AxiosError) => void) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const subscribeUpdate = useCallback(
    async (params: { email: string; projectIds: number[]; optionProjects: string[] }) => {
      try {
        setIsLoading(true);
        await ProjectApi.updateSubscribeProjects(params);
        successCallback();
      } catch (e) {
        setIsError(true);
        errorCallback?.(e as AxiosError);
      } finally {
        setIsLoading(false);
      }
    },
    [errorCallback, successCallback],
  );

  return {
    subscribeUpdate,
    isError,
    isLoading,
  };
};
