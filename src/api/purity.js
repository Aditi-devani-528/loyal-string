import useSWR from 'swr';
import {useMemo} from 'react';

import {fetcher} from '../utils/axios';
import {useAuthContext} from "../auth/hooks";


export function useGetPurity() {
  const {user} = useAuthContext()
  const URL = `https://gold-erp.onrender.com/api/company/${user?.company}/purity`;
  const {data, isLoading, error, isValidating, mutate} = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      purity: data?.data || [],
      purityLoading: isLoading,
      purityError: error,
      purityValidating: isValidating,
      purityEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [data?.data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
