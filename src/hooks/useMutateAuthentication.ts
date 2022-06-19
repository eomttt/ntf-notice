import { UserApi } from 'api/UserApi';
import { useCallback, useState } from 'react';

export const useMutateAuthentication = () => {
  const [data, setData] = useState<object>();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const authentication = useCallback(async (token: string) => {
    try {
      setIsLoading(true);
      const res = await UserApi.authentication({ token });
      setData(res);
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    authentication,
    data,
    isError,
    isLoading,
  };
};
