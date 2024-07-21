"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import styles from "./ProjectsSection.module.css";

import ProjectCard from "@/components/shared/project-card/ProjectCard";

export default function ProjectsSection() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const t = useTranslations("HomePage");

    async function getProjects() {
        try {
            const res = await fetch("/api/projects");
            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await res.json();
            setProjects(data);
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

    return (
        <>
            <div className={styles.cards}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))
                )}
            </div>
        </>
    );
}
