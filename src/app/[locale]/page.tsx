import { Link } from "@/lib/navigation";
import Image from "next/image";

import { useTranslations } from "next-intl";

import styles from "./page.module.css";

import LanguageInfo from "@/components/shared/language-info/LanguageInfo";
import Skills from "@/components/HomePage/skills";

import ProjectsSection from "@/components/HomePage/projects-section/ProjectsSection";
import WorkSection from "@/components/HomePage/work-section/WorkSection";

import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { BiSolidFilePdf } from "react-icons/bi";
import ContactForm from "@/components/HomePage/contact-form/ContactForm";

export default function HomePage() {
    const t = useTranslations("HomePage");
    return (
        <main className={`container ${styles.main}`}>
            <section className={styles.about_section}>
                <div>
                    <div>
                        <h1>{t("about.title")}</h1>
                        <h2>{t("about.subtitle")}</h2>
                        <div className={styles.social_links}>
                            <Link
                                href={"https://github.com/jordan-cod"}
                                target="_blank"
                            >
                                <FaGithub />
                            </Link>
                            <Link
                                href={
                                    "https://www.linkedin.com/in/gabrieljordandev/"
                                }
                                target="_blank"
                            >
                                <FaLinkedinIn />
                            </Link>
                            <Link
                                href={"/gabriel-jordan-fullftack.pdf"}
                                target="_blank"
                            >
                                <BiSolidFilePdf />
                            </Link>
                        </div>
                    </div>
                    <div className={styles.languages_section}>
                        <h3>{t("about.languages.title")}</h3>
                        <div>
                            <LanguageInfo
                                image="/brasil-flag.png"
                                alt="brasil-flag"
                                language={t("about.languages.portuguese.title")}
                                level={t("about.languages.portuguese.subtitle")}
                                key={t("about.languages.portuguese.title")}
                            />
                            <LanguageInfo
                                image="/usa-flag.png"
                                alt="usa-flag"
                                language={t("about.languages.english.title")}
                                level={t("about.languages.english.subtitle")}
                                key={t("about.languages.english.title")}
                            />
                        </div>
                    </div>
                    <div>
                        <h3>{t("about.skills.title")}</h3>
                        <Skills />
                    </div>
                </div>
                <figure>
                    <Image
                        src={"/me.png"}
                        alt="Gabriel Jordan"
                        width={249}
                        height={249}
                    />
                </figure>
            </section>
            <section className={styles.projects_section}>
                <h3>{t("projects.title")}</h3>
                <ProjectsSection />
                <Link href={"/projects"} className={styles.card_link}>
                    {t("projects.button")}
                </Link>
            </section>
            <section className={styles.work_section}>
                <h3>{t("work.title")}</h3>
                <WorkSection />
                <Link href={"/work-experience"} className={styles.card_link}>
                    {t("projects.button")}
                </Link>
            </section>
            <section className={styles.contact_section}>
                <h3>{t("contact.title")}</h3>
                <ContactForm />
            </section>
        </main>
    );
}
