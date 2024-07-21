import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";

import "@/styles/globals.css";
import ScrollToTopButton from "@/components/shared/buttons/scroll-top-button/ScrollTopButton";
import Header from "@/components/ui/header/Header";

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
                    <Header />
                    {children}
                    <ScrollToTopButton />
                </body>
            </NextIntlClientProvider>
        </html>
    );
}
