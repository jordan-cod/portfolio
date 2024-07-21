"use client";
import { useRouter, usePathname } from "next/navigation";
import styles from "./PrimaryChangeLanguage.module.css";
import { FaLanguage } from "react-icons/fa";

export default function PrimaryChangeLanguage(): React.ReactNode {
    const router = useRouter();
    const pathname = usePathname();

    function getCurrentLocale(): string {
        const pathParts = pathname.split("/");
        return pathParts[1] || "en";
    }

    function changeLanguage(locale: string): void {
        const currentPath = pathname.replace(
            `/${getCurrentLocale()}`,
            `/${locale}`,
        );
        router.push(currentPath);
    }

    const currentLocale = getCurrentLocale();

    return (
        <span
            onClick={() => {
                if (currentLocale === "en") {
                    changeLanguage("pt-br");
                } else {
                    changeLanguage("en");
                }
            }}
            className={styles.languageButton}
            data-testid="change-lang-button"
        >
            {" "}
            <FaLanguage size={20} />
            {currentLocale === "en" ? "English" : "Português"}
        </span>
    );
}
