import { createContext, useContext, useState, ReactNode } from "react";

type FilterContextType = {
    filters: { [key: string]: any };
    setFilters: (filters: { [key: string]: any }) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: React.ReactNode }) {
    const [filters, setFilters] = useState<{ [key: string]: any }>({});

    return (
        <FilterContext.Provider value={{ filters, setFilters }}>
            {children}
        </FilterContext.Provider>
    );
}

export const useFilterContext = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error(
            "useFilterContext must be used within a FilterProvider",
        );
    }
    return context;
};
