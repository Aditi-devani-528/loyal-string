import useSWR from 'swr';
import { useMemo } from 'react';
import { fetcher } from '../utils/axios';
import { useAuthContext } from "../auth/hooks";

export function useGetDevice() {
    const { user } = useAuthContext();

    // Check if user is defined
    if (!user) {
        console.warn("User is not authenticated.");
        return {
            device: data?.data || [],
            deviceLoading: isLoading,
            deviceError: "User not authenticated",
            deviceValidating: isValidating,
            deviceEmpty: !isLoading && !data?.length,
            mutate,
        };
    }

    const URL = `https://gold-erp.onrender.com/api/company/${user?.company}/device`;
    console.log("Fetching URL:", URL);
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