import { useEffect, useRef, useState } from "react";
import styles from "./Select.module.css";

interface SelectProps {
    options: { value: string; label: string }[];
    value: string;
    onChange: (value: string) => void;
}

export default function Select({ options, value, onChange }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef<HTMLDivElement>(null);

    function handleOptionClick(optionValue: string) {
        onChange(optionValue);
        setIsOpen(false);
    }

    function handleClickOutside(event: MouseEvent) {
        if (
            selectRef.current &&
            !selectRef.current.contains(event.target as Node)
        ) {
            setIsOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.selectContainer} ref={selectRef}>
            <div
                className={styles.selectedValue}
                onClick={() => setIsOpen(!isOpen)}
            >
                {options.find((option) => option.value === value)?.label}
                <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
            </div>
            {isOpen && (
                <div className={styles.options}>
                    {options.map((option) => (
                        <div
                            key={option.value}
                            className={styles.option}
                            onClick={() => handleOptionClick(option.value)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
