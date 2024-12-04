import { useState, useEffect } from "react";

export const useFetch = (url, options = {}, immediate = true) => {
    const [data, setData] = useState(null);
    const [queryOptions, setQueryOptions] = useState(options);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [shouldFetch, setShouldFetch] = useState(immediate);

    useEffect(() => {
        if (!shouldFetch) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(url, queryOptions);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
        setShouldFetch(false);
    }, [url, options, shouldFetch]);

    const refetch = (body) => {
        setQueryOptions({ ...options, body });
        setShouldFetch(true);
    }

    return { data, error, loading, refetch };
};
