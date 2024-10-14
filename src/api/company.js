import useSWR from 'swr';
import {useMemo} from 'react';

import {fetcher} from '../utils/axios';
import {useAuthContext} from "../auth/hooks";


export function useGetCompany() {
  const {user} = useAuthContext()
  const URL = `https://gold-erp.onrender.com/api/company/`;
  const {data, isLoading, error, isValidating, mutate} = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      company: data?.data || [],
      companyLoading: isLoading,
      companyError: error,
      companyValidating: isValidating,
      companyEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [data?.data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
