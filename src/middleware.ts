import createMiddleware from "next-intl/middleware";
import { locales /* ... */ } from "@/lib/config";

export default createMiddleware({
    // A list of all locales that are supported
    locales,

    // Used when no locale matches
    defaultLocale: "en",
});

export const config = {
    // Match only internationalized pathnames
    matcher: ["/", "/(en|pt-br)/:path*"],
};
