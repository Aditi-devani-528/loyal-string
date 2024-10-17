import useSWR from 'swr';
import { useMemo } from 'react';
import { fetcher } from '../utils/axios';
import { useAuthContext } from "../auth/hooks";

export function useGetDesign() {
    const { user } = useAuthContext();

    // Check if user is defined
    if (!user) {
        console.warn("User is not authenticated.");
        return {
            design: data?.data || [],
            designLoading: isLoading,
            designError: "User not authenticated",
            designValidating: isValidating,
            designEmpty: !isLoading && !data?.length,
            mutate,
        };
    }

    const URL = `https://gold-erp.onrender.com/api/company/${user?.company}/design`;
    // console.log("Fetching URL:", URL);

    const { data, error, isLoading, isValidating, mutate } = useSWR(URL, fetcher, {
        onSuccess: (data) => {
            console.log("Data fetched successfully:", data);
        },
        onError: (error) => {
            console.error("SWR Error:", error);
        },
    });

    if (error) {
        console.error("Error fetching data:", error.response ? error.response.data : error.message);
    }

    const memoizedValue = useMemo(
        () => ({
            design: data?.data || [],
            designLoading: isLoading,
            designError: error ? error.message : null,
            designValidating: isValidating,
            designEmpty: !isLoading && !data?.data?.length,
            mutate,
        }),
        [data, error, isLoading, isValidating, mutate]
    );
    return memoizedValue;
}
