"use client";
import { useEffect, useState } from "react";
import Tag from "../shared/tag/Tag";
import styles from "./Skills.module.css";

export default function Skills() {
    const [tecnologies, setTecnologies] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    async function getTecnologies() {
        try {
            const res = await fetch("/api/tecnologies");
            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }
            const data = await res.json();
            setTecnologies(data);
        } catch (err: any) {
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getTecnologies();
    }, []);

    const skeletonWidths = [
        "80px",
        "120px",
        "100px",
        "150px",
        "90px",
        "110px",
        "140px",
    ];

    if (loading) {
        return (
            <div className={styles.skeletonContainer}>
                {skeletonWidths.map((width, index) => (
                    <div
                        key={index}
                        className={styles.skeletonTag}
                        style={{ width }}
                    ></div>
                ))}
            </div>
        );
    }

    return (
        <div className={styles.skills}>
            {tecnologies.map((tech, index) => (
                <Tag key={index}>{tech}</Tag>
            ))}
        </div>
    );
}
