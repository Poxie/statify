import { get } from "@/utils";
import { useEffect, useState } from "react";

const DEFAULT_WAIT_BEFORE_FETCH = 250;
export default function useSearchResults<T>({ path, options }: {
    path: string | null;
    options?: {
        waitBeforeFetch?: number;
    }
}) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if(!path) {
            setData([]);
            return;
        }

        setLoading(true);
        const timeout = setTimeout(() => {
            get<T[]>(path)
                .then(results => {
                    setData(results);
                })
                .catch(error => {
                    setError(error);
                })
                .finally(() => {
                    setLoading(false);
                });
        }, options?.waitBeforeFetch || DEFAULT_WAIT_BEFORE_FETCH);
        
        return () => {
            setLoading(false);
            clearTimeout(timeout);
        }
    }, [path, options]);

    return {
        data,
        error,
        loading,
    };
}