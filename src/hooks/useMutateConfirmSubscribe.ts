import { ProjectApi } from 'api/ProjectApi';
import { useCallback, useState } from 'react';

export const useMutateConfirmSubscribe = () => {
  const [data, setData] = useState<object>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const confirmSubscribe = useCallback(async (token: string) => {
    try {
      setIsLoading(true);
      const res = await ProjectApi.confirmSubscribeProjects({ token });
      setData(res);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    confirmSubscribe,
    data,
    isError,
    isLoading,
  };
};
