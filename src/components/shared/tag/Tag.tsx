import styles from "./Tag.module.css";

export default function Tag({
    children,
}: {
    children: React.ReactNode;
}): React.ReactNode {
    return <span className={styles.tag}>{children}</span>;
}
