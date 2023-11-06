import { useState } from "react"

export const useSortedResults = <T extends Record<string, any> | string>(results: T[], sortByKey: string | undefined) => {
    const [query, setQuery] = useState('');
    
    let sortedResults: T[] = [];
    if(typeof results[0] === 'string') {
        sortedResults = results.filter(result => (result as string).toLowerCase().includes(query.toLowerCase()));
    } else if(sortByKey) {
        sortedResults = results.sort((a,b) => {
            if(typeof a !== 'object' || typeof b !== 'object') throw new Error('Sort by key was provided, but items are not objects.');
            if(!(sortByKey in a) || !(sortByKey in b)) throw new Error('Key to sort by is not in result objects.');
            return b[sortByKey] - a[sortByKey];
        })
    }

    return {
        setQuery,
        query,
        results: sortedResults,
    }
}