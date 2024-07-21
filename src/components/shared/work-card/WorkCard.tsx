import { useState } from "react";
import Image from "next/image";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import styles from "./WorkCard.module.css";

interface WorkExperience {
    imageSrc: string;
    title: string;
    company: string;
    period: string;
    details: string; // Added details for dropdown content
}

export default function WorkCard({ work }: { work: WorkExperience }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <article className={styles.card}>
            <div className={styles.mainContent}>
                <figure>
                    <Image
                        src={work.imageSrc}
                        alt={work.title}
                        width={73}
                        height={73}
                    />
                </figure>
                <div className={styles.textContainer}>
                    <h4>{work.title}</h4>
                    <div>
                        <h5>{work.company}</h5>
                        <p>{work.period}</p>
                    </div>
                </div>
                <div className={styles.icon} onClick={toggleDropdown}>
                    {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
                </div>
            </div>
            {isOpen && (
                <div className={styles.dropdown}>
                    <p>{work.details}</p>
                </div>
            )}
        </article>
    );
}
