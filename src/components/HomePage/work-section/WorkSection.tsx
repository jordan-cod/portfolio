"use client";
import WorkCard from "@/components/shared/work-card/WorkCard";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import styles from "./WorkSection.module.css";

export default function WorkSection() {
    const t = useTranslations("HomePage");

    const [workExperiences, setworkExperiences] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    async function getProjects() {
        try {
            const res = await fetch("/api/work");
            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await res.json();
            setworkExperiences(data);
        } catch (err: any) {
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProjects();
    }, []);

    if (loading) {
        return (
            <article className={styles.skeletonCard}>
                <figure className={styles.skeletonImage}></figure>
                <div className={styles.skeletonContent}>
                    <div className={styles.skeletonTitle}></div>
                    <div className={styles.skeletonDetails}>
                        <div className={styles.skeletonCompany}></div>
                        <div className={styles.skeletonPeriod}></div>
                    </div>
                </div>
                <div className={styles.skeletonIcon}></div>
            </article>
        );
    }

    return (
        <>
            {workExperiences.map((work, index) => (
                <WorkCard key={index} work={work} />
            ))}
        </>
    );
}
