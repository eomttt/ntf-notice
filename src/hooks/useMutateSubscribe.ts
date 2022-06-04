import { ProjectApi } from 'api/ProjectApi';
import { AxiosError } from 'axios';
import { useCallback, useState } from 'react';

export const useMutateSubscribe = (successCallback: () => void, errorCallback: (e: AxiosError) => void) => {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const subscribeProject = useCallback(
    async (params: { email: string; projectIds: number[]; optionProjects: string[] }) => {
      try {
        setIsLoading(true);
        await ProjectApi.subscribeProjects(params);
        successCallback();
      } catch (e) {
        setIsError(true);
        errorCallback(e as AxiosError);
      } finally {
        setIsLoading(false);
      }
    },
    [errorCallback, successCallback],
  );

  return {
    subscribeProject,
    isError,
    isLoading,
  };
};
