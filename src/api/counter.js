
import useSWR from 'swr';
import {useMemo} from 'react';

import {fetcher} from '../utils/axios';
import {useAuthContext} from "../auth/hooks";


export function useGetCounter() {
  const {user} = useAuthContext()
  const URL = `${import.meta.env.VITE_HOST_API}/${user?.company}/counter`;
  const {data, isLoading, error, isValidating, mutate} = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      counter: data?.data || [],
      counterLoading: isLoading,
      counterError: error,
      counterValidating: isValidating,
      counterEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [data?.data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

