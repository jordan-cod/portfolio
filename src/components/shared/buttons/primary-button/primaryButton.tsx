import styles from "./primaryButton.module.css";

interface PrimaryButtonProps {
    onClick?: () => void;
    disabled?: boolean;
    children: React.ReactNode;
}

export default function PrimaryButton({
    onClick,
    disabled = false,
    children,
}: PrimaryButtonProps): React.ReactNode {
    return (
        <button
            className={`${styles.primaryButton} ${disabled ? styles.disabled : null}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
