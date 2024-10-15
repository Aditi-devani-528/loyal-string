
import useSWR from 'swr';
import {useMemo} from 'react';

import {fetcher} from '../utils/axios';
import {useAuthContext} from "../auth/hooks";


export function useGetPacket() {
  const {user} = useAuthContext()
  const URL = `https://gold-erp.onrender.com/api/company/${user?.company}/packet`;
  const {data, isLoading, error, isValidating, mutate} = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      packet: data?.data || [],
      packetLoading: isLoading,
      packetError: error,
      packetValidating: isValidating,
      packetEmpty: !isLoading && !data?.length,
      mutate,
    }),
    [data?.data, error, isLoading, isValidating, mutate]
  );

  return memoizedValue;
}

