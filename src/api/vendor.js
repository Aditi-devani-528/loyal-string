import useSWR from 'swr';
import { useMemo } from 'react';
import { fetcher } from '../utils/axios';
import { useAuthContext } from '../auth/hooks';

export function useGetVendor() {
  const { user } = useAuthContext();
  const URL = `${import.meta.env.VITE_HOST_API}/${user?.company}/vendor`;

  const { data, error, isLoading, isValidating, mutate } = useSWR(URL, fetcher, {
    onSuccess: (data) => {
      console.log('Data fetched successfully:', data);
    },
    onError: (error) => {
      console.error('SWR Error:', error);
    },
  });

  if (error) {
    console.error('Error fetching data:', error.response ? error.response.data : error.message);
  }

  const memoizedValue = useMemo(
    () => ({
      vendor: data?.data || [],
      vendorLoading: isLoading,
      vendorError: error ? error.message : null,
      vendorValidating: isValidating,
      vendorEmpty: !isLoading && !data?.data?.length,
      mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );
  return memoizedValue;
}
