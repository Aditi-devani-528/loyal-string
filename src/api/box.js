
import useSWR from 'swr';
import {useMemo} from 'react';

import {fetcher} from '../utils/axios';
import {useAuthContext} from "../auth/hooks";


export function useGetBox() {
  const {user} = useAuthContext()
  const URL = `${import.meta.env.VITE_HOST_API}/${user?.company}/box`;
  const {data, isLoading, error, isValidating, mutate} = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      box: data?.data || [],
      boxLoading: isLoading,
      boxError: error,
      boxValidating: isValidating,
      boxEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [data?.data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}





