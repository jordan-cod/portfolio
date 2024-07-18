import { useTranslations } from "next-intl";

export default function HomePage() {
    const t = useTranslations("Index");
    return (
        <main>
            <h1>{t("HomePage.about.title")}</h1>
            <nav>
                <li>{t("Header.links.home")}</li>
            </nav>
        </main>
    );
}
