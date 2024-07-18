import { useTranslations } from "next-intl";

export default function HomePage() {
    const t = useTranslations("HomePage");
    return (
        <main>
            <h1>{t("about.title")}</h1>
        </main>
    );
}
