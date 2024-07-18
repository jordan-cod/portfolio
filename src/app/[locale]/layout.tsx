import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";

import "@/styles/globals.css";
import ScrollToTopButton from "@/components/shared/buttons/scroll-to-top-button/ScrollToTopButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Gabriel Jordan",
    description: "Gabriel Jordan, desenvolvedor FullStack.",
};

export default async function RootLayout({
    children,
    params: { locale },
}: Readonly<{
    children: React.ReactNode;
    params: { locale: string };
}>) {
    const messages = await getMessages();
    return (
        <html lang={locale}>
            <NextIntlClientProvider messages={messages}>
                <body className={inter.className}>
                    {children}
                    <ScrollToTopButton />
                </body>
            </NextIntlClientProvider>
        </html>
    );
}
