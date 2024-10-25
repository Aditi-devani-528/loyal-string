import useSWR from 'swr';
import {useMemo} from 'react';
import {fetcher} from '../utils/axios';
import {useAuthContext} from "../auth/hooks";


export function useGetRate() {
  const {user} = useAuthContext()
  const URL = `${import.meta.env.VITE_HOST_API}/${user?.company}/rate`;
  const {data, isLoading, error, isValidating, mutate} = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      rate: data?.data || [],
      rateLoading: isLoading,
      rateError: error,
      rateValidating: isValidating,
      rateEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [data?.data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
