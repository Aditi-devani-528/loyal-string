// import useSWR from 'swr';
// import {useMemo} from 'react';
// import {fetcher} from 'src/utils/axios';
// import {useAuthContext} from 'src/auth/hooks';
//
// export function useGetCategory() {
//   const {user} = useAuthContext();
//   const URL = `${import.meta.env.VITE_AUTH_API}/company/${user?.company}/category`;
//   const {data, error, isValidating, mutate} = useSWR(URL, fetcher);
//
//   if (error) {
//     console.error('Error fetching data:', error);
//   }
//
//   const memoizedValue = useMemo(() => {
//     const category = data?.data || [];
//     const isLoading = !data && !error;
//     return {
//       category,
//       categoryLoading: isLoading,
//       categoryError: error,
//       categoryValidating: isValidating,
//       categoryEmpty: !isLoading && category?.length === 0,
//       mutate,
//     };
//   }, [data?.data, error, isValidating, mutate]);
//
//   return memoizedValue;
// }


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





