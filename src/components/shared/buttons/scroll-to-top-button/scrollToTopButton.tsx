"use client";
import { useState, useEffect } from "react";

import styles from "./scrollToTopButton.module.css";

import { IoIosArrowUp } from "react-icons/io";

export default function ScrollToTopButton(): React.ReactNode {
    const [isVisible, setIsVisible] = useState<boolean>(false);

    function toggleVisibility(): void {
        if (window.scrollY > 300) {
            setIsVisible(true);
            return;
        }
        setIsVisible(false);
    }

    function scrollToTop(): void {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);
        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    return (
        <button
            onClick={scrollToTop}
            className={`${styles.button} ${isVisible ? styles.visible : null}`}
            aria-label="Scroll to top"
        >
            <IoIosArrowUp />
        </button>
    );
}
