
import useSWR from 'swr';
import {useMemo} from 'react';

import {fetcher} from '../utils/axios';
import {useAuthContext} from "../auth/hooks";


export function useGetProductMaster() {
  const {user} = useAuthContext()
  const URL = `${import.meta.env.VITE_HOST_API}/${user?.company}/product`;
  const {data, isLoading, error, isValidating, mutate} = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      product: data?.data || [],
      productLoading: isLoading,
      productError: error,
      productValidating: isValidating,
      productEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [data?.data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

