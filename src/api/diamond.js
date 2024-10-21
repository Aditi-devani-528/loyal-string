
import useSWR from 'swr';
import { useMemo } from 'react';

import { fetcher } from '../utils/axios';
import { useAuthContext } from "../auth/hooks";


export function useGetDiamond() {
    const { user } = useAuthContext()
    const URL = `${import.meta.env.VITE_HOST_API}/${user?.company}/diamond`;
    const { data, isLoading, error, isValidating, mutate } = useSWR(URL, fetcher);

    const memoizedValue = useMemo(
        () => ({
            diamond: data?.data || [],
            diamondLoading: isLoading,
            diamondError: error,
            diamondValidating: isValidating,
            diamondEmpty: !isLoading && !data?.length,
            mutate,
        }),
        [data?.data, error, isLoading, isValidating, mutate]
    );

    return memoizedValue;
}





