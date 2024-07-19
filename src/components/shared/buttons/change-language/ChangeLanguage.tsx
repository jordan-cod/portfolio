"use client";
import { useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

import styles from "./ChangeLanguage.module.css";

import { FaLanguage } from "react-icons/fa";

export default function ChangeLanguage(): React.ReactNode {
    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false);
    const router = useRouter();
    const pathname = usePathname();
    const dropdownRef = useRef<HTMLDivElement>(null);

    function usePathname() {
        return typeof window !== "undefined" ? window.location.pathname : "/";
    }

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
        setDropdownVisible(false);
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setDropdownVisible(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.container}>
            <button
                onClick={() => setDropdownVisible(!dropdownVisible)}
                data-testid="change-lang-button"
            >
                <FaLanguage size={35} color="B0BAC5" />
            </button>
            {dropdownVisible && (
                <div className={styles.dropdown} ref={dropdownRef}>
                    <button
                        onClick={() => changeLanguage("en")}
                        data-testid="lang-en"
                    >
                        <Image
                            src={"/usa-flag.png"}
                            alt="portuguese"
                            width={29}
                            height={20}
                        />
                        <p>English</p>
                    </button>
                    <button
                        onClick={() => changeLanguage("pt-br")}
                        data-testid="lang-pt-br"
                    >
                        <Image
                            src={"/brasil-flag.png"}
                            alt="portuguese"
                            width={29}
                            height={20}
                        />
                        Português
                    </button>
                </div>
            )}
        </div>
    );
}
