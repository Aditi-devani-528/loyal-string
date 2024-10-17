import useSWR from 'swr';
import { useMemo } from 'react';
import { fetcher } from '../utils/axios';
import { useAuthContext } from '../auth/hooks';

export function useGetOccasion() {
  const { user } = useAuthContext();
  const URL = `${import.meta.env.VITE_HOST_API}/${user?.company}/occasion`;

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
      occasion: data?.data || [],
      occasionLoading: isLoading,
      occasionError: error ? error.message : null,
      occasionValidating: isValidating,
      occasionEmpty: !isLoading && !data?.data?.length,
      mutate,
    }),
    [data, error, isLoading, isValidating, mutate]
  );
  return memoizedValue;
}
