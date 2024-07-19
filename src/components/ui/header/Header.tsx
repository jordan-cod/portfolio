"use client";
import { Link } from "@/lib/navigation";
import { useTranslations } from "next-intl";
import styles from "./Header.module.css";

import { HiBars3BottomRight } from "react-icons/hi2";

import ChangeLanguage from "@/components/shared/buttons/change-language/ChangeLanguage";
import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaHome, FaLanguage } from "react-icons/fa";
import { MdOutlineComputer } from "react-icons/md";
import PrimaryChangeLanguage from "@/components/shared/buttons/primary-change-language/PrimaryChangeLanguage";

export default function Header() {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const t = useTranslations("Header");

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className={`container ${styles.header}`}>
            <section className={styles.desktop_menu}>
                <h1>
                    Gabriel <b>Jordan</b>
                </h1>
                <nav>
                    <ul>
                        <li>
                            <Link href={"/"}>{t("links.home")}</Link>
                        </li>
                        <li>
                            <Link href={"/projects"}>
                                {t("links.projects")}
                            </Link>
                        </li>
                    </ul>
                    <ChangeLanguage />
                </nav>
            </section>
            <section
                className={`${styles.mobile_menu} ${isOpen ? styles.active : ""}`}
                ref={menuRef}
            >
                <div>
                    <h1>
                        Gabriel <b>Jordan</b>
                    </h1>
                    <div onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? (
                            <IoClose size={30} />
                        ) : (
                            <HiBars3BottomRight size={30} />
                        )}
                    </div>
                </div>

                <ul>
                    <li>
                        <Link href={"/"} onClick={() => setIsOpen(false)}>
                            <FaHome size={20} />
                            {t("links.home")}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={"/projects"}
                            onClick={() => setIsOpen(false)}
                        >
                            <MdOutlineComputer size={20} />
                            {t("links.projects")}
                        </Link>
                    </li>
                    <li>
                        <a onClick={() => setIsOpen(false)}>
                            <FaLanguage size={20} />
                            <PrimaryChangeLanguage />
                        </a>
                    </li>
                </ul>
            </section>
        </header>
    );
}
