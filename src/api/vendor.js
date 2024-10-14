import useSWR from 'swr';
import {useMemo} from 'react';

import {fetcher} from '../utils/axios';
import {useAuthContext} from "../auth/hooks";


export function useGetCompany() {
  const {user} = useAuthContext()
  const URL = `https://gold-erp.onrender.com/api/vendor/`;
  const {data, isLoading, error, isValidating, mutate} = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      vendor: data?.data || [],
      vendorLoading: isLoading,
      vendorError: error,
      vendorValidating: isValidating,
      vendorEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [data?.data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}
