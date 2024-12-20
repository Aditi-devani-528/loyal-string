import useSWR from 'swr';
import { useMemo } from 'react';
import { fetcher } from '../utils/axios';
import { useAuthContext } from '../auth/hooks';

export function useGetDevice() {
  const { user } = useAuthContext();
  const URL = `${import.meta.env.VITE_HOST_API}/${user?.company}/device`;

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
      device: data?.data || [],
      deviceLoading: isLoading,
      deviceError: error ? error.message : null,
      deviceValidating: isValidating,
      deviceEmpty: !isLoading && !data?.data?.length,
      mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );
  return memoizedValue;
}
