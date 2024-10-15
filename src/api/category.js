
import useSWR from 'swr';
import {useMemo} from 'react';

import {fetcher} from '../utils/axios';
import {useAuthContext} from "../auth/hooks";


export function useGetCategory() {
  const {user} = useAuthContext()
  const URL = `https://gold-erp.onrender.com/api/company/${user?.company}/category`;
  const {data, isLoading, error, isValidating, mutate} = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      category: data?.data || [],
      categoryLoading: isLoading,
      categoryError: error,
      categoryValidating: isValidating,
      categoryEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [data?.data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}





