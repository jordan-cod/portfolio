import { createSharedPathnamesNavigation } from "next-intl/navigation";
import { locales /* ... */ } from "@/lib/config";

export const { Link, redirect, usePathname, useRouter } =
    createSharedPathnamesNavigation({ locales /* ... */ });
