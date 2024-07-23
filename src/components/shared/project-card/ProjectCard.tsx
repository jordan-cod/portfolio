import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./ProjectCard.module.css";
import Tag from "../tag/Tag";

import { IoCodeSlash } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";

interface ProjectCardProps {
    project: {
        id: string;
        imgUrl: string;
        title: string;
        description: {
            en: string;
            pt: string;
        };
        technologies: Array<string>;
        repoUrl: string;
        deployUrl: string;
        date: string;
    };
}

export default function ProjectCard({ project }: ProjectCardProps) {
    const pathname = usePathname();

    function getCurrentLocale(): string {
        const pathParts = pathname.split("/");
        return pathParts[1] || "en";
    }

    function formatDate(date: string): string {
        const locale = getCurrentLocale();
        const formatter = new Intl.DateTimeFormat(locale, {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        return formatter.format(new Date(date));
    }

    return (
        <article className={styles.card}>
            <figure>
                <Image
                    src={project.imgUrl}
                    alt={project.title}
                    width={112}
                    height={112}
                />
            </figure>
            <div className={styles.about_project}>
                <h4>{project.title}</h4>
                {getCurrentLocale() === "en" ? (
                    <p>{project.description.en}</p>
                ) : (
                    <p>{project.description.pt}</p>
                )}
                <div className={styles.technologies}>
                    {project.technologies.map((technology, index) => (
                        <Tag key={index}>{technology}</Tag>
                    ))}
                </div>
            </div>
            <div className={styles.about_info}>
                <Link href={project.repoUrl} target="_blank">
                    <IoCodeSlash />
                </Link>
                <Link href={project.deployUrl} target="_blank">
                    <TbWorld />
                </Link>
            </div>
            <div className={styles.date}>
                <p>{formatDate(project.date)}</p>
            </div>
        </article>
    );
}
