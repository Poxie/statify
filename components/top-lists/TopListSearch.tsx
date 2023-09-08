"use client";
import Input from "../input";
import Countries from '@/assets/json/countries.json';
import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function TopListSearch() {
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    const onSelect = (country: string) => {
        router.push(`/top-lists?country=${country}`, { scroll: false });
    }

    const filteredCountries = useMemo(() => (
        Countries.filter(country => country.name.toLowerCase().includes(search.toLowerCase()))
    ), [search]);
    return(
        <div className="relative">
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
                        className="absolute z-20 top-[calc(100%+12px)] w-full rounded-lg bg-secondary border-[1px] border-tertiary p-2 max-h-[350px] overflow-auto scrollbar"
                    >
                        {!filteredCountries.length && (
                            <span className="p-3 block text-sm text-secondary">
                                Your country was not found.
                            </span>
                        )}
                        {filteredCountries.map(country => (
                            <li key={country.name}>
                                <button
                                    className="w-full text-left text-lg py-2 px-3 rounded-lg transition-colors hover:bg-tertiary"
                                    onClick={() => onSelect(country.name)}
                                >
                                    {country.name}
                                </button>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    )
}