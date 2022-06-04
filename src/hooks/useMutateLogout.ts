import { UserApi } from 'api/UserApi';
import { useCallback } from 'react';

export const useMutateLogout = () => {
  const logout = useCallback(() => UserApi.logOut(), []);

  return {
    logout,
  };
};
