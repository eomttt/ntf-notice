import { UserApi } from 'api/UserApi';
import { useCallback, useState } from 'react';

export const useMutateSendAuthEmail = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendEmail = useCallback(async (email: string) => {
    try {
      setIsLoading(true);
      await UserApi.sendEmail(email);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    isLoading,
    sendEmail,
  };
};
