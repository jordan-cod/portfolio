import React, { useEffect, useState } from "react";
import { useFilterContext } from "@/contexts/FilterContext";
import styles from "./Results.module.css";

import ProjectCard from "@/components/shared/project-card/ProjectCard";

type CardData = {
    id: string;
    title: string;
    description: {
        en: string;
        pt: string;
    };
    technologies: string[];
    imgUrl: string;
    repoUrl: string;
    deployUrl: string;
    date: string;
};

export default function CardList() {
    const { filters } = useFilterContext();
    const [data, setData] = useState<CardData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("/api/projects");
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                const result = await response.json();
                setData(result);
            } catch (err) {
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const filteredData = data.filter((item) => {
        const matchesText =
            item.title
                .toLowerCase()
                .includes(filters.searchText?.toLowerCase() || "") ||
            item.description.en
                .toLowerCase()
                .includes(filters.searchText?.toLowerCase() || "") ||
            item.description.pt
                .toLowerCase()
                .includes(filters.searchText?.toLowerCase() || "");

        const matchesTechnology =
            !filters.filterValue ||
            item.technologies.includes(filters.filterValue);

        return matchesText && matchesTechnology;
    });

    const sortedData = filteredData.sort((a, b) => {
        if (filters.sortby === "date") {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
        return 0;
    });

    if (loading) {
        return (
            <article className={styles.skeletonCard}>
                <figure className={styles.skeletonImage}></figure>
                <div className={styles.skeletonAboutProject}>
                    <div
                        className={styles.skeletonText}
                        style={{ width: "70%" }}
                    ></div>
                    <div
                        className={styles.skeletonText}
                        style={{ width: "50%" }}
                    ></div>
                    <div className={styles.skeletonTechnologies}>
                        <div className={styles.skeletonTag}></div>
                        <div className={styles.skeletonTag}></div>
                        <div className={styles.skeletonTag}></div>
                    </div>
                </div>
                <div className={styles.skeletonAboutInfo}>
                    <div className={styles.skeletonIcon}></div>
                    <div className={styles.skeletonIcon}></div>
                </div>
            </article>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={styles.cardList}>
            {sortedData.map((item) => (
                <ProjectCard key={item.id} project={item} />
            ))}
        </div>
    );
}
