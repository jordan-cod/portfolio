"use client";
import { useTranslations } from "next-intl";
import styles from "./page.module.css";
import Filter from "@/components/shared/Filter/Filter";

import { FilterProvider } from "@/contexts/FilterContext";
import Results from "@/components/ProjectsPage/results/Results";

export default function Projects() {
    const t = useTranslations("ProjectsPage");

    return (
        <FilterProvider>
            <main className={`container ${styles.main}`}>
                <Filter />
                <Results />
            </main>
        </FilterProvider>
    );
}
