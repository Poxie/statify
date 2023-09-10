"use client";
import Input from "../input";
import Countries from '@/assets/json/countries.json';
import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import TopListSearchItem from "./TopListSearchItem";

export default function TopListSearch() {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    const onSelect = (country: string) => {
        if(country === 'global') return router.push(`/top-lists`, { scroll: false });
        router.push(`/top-lists?country=${country}`, { scroll: false });
    }

    const filteredCountries = useMemo(() => (
        Countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
    ), [search]);
    return(
        <div className="relative w-[600px] max-w-full mx-auto">
            <Input 
                placeholder={'Find your country...'}
                className="text-base py-4"
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                onChange={setSearch}
            />
            <AnimatePresence>
                {open && (
                    <motion.ul
                        exit={{ scale: .98, opacity: 0 }}
                        initial={{ scale: .98, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: .2, bounce: false }}
                        className="absolute z-20 top-[calc(100%+8px)] w-full rounded-lg bg-secondary border-[1px] border-tertiary p-2 max-h-[350px] overflow-auto scrollbar"
                    >
                        {!search && (
                            <TopListSearchItem 
                                text={'Globally'}
                                onSelect={() => onSelect('global')}
                            />
                        )}
                        {!filteredCountries.length && (
                            <span className="p-3 block text-sm text-secondary">
                                Your country was not found.
                            </span>
                        )}
                        {filteredCountries.map(country => (
                            <TopListSearchItem 
                                text={country.name}
                                onSelect={() => onSelect(country.name)}
                            />
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}