import { useTranslations } from "next-intl";

import Tag from "@/components/shared/tag/Tag";

export default function HomePage() {
    const t = useTranslations("HomePage");
    return (
        <main>
            <h1>{t("about.title")}</h1>
            <Tag>CSS</Tag>
        </main>
    );
}
