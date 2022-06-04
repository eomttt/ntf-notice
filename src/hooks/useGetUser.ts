import { UserApi } from 'api/UserApi';
import useSWR from 'swr';

export const useGetUser = () => useSWR('/api/user', () => UserApi.getUser());
