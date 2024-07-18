import Image from "next/image";

import styles from "./LanguageInfo.module.css";

interface LanguageInfoProps {
    image: string;
    alt: string;
    language: string;
    level: string;
}

export default function LanguageInfo({
    image,
    alt,
    language,
    level,
}: LanguageInfoProps) {
    return (
        <span className={styles.language}>
            <figure>
                <Image src={image} alt={alt} width={29} height={20.87} />
            </figure>
            <div>
                <p>{language}</p>
                <p>{level}</p>
            </div>
        </span>
    );
}
