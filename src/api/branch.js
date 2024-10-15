
import useSWR from 'swr';
import {useMemo} from 'react';

import {fetcher} from '../utils/axios';
import {useAuthContext} from "../auth/hooks";


export function useGetBranch() {
  const {user} = useAuthContext()
  const URL = `https://gold-erp.onrender.com/api/company/${user?.company}/branch`;
  const {data, isLoading, error, isValidating, mutate} = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      branch: data?.data || [],
      branchLoading: isLoading,
      branchError: error,
      branchValidating: isValidating,
      branchEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [data?.data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}





