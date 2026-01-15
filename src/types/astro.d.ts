import type { Locale } from "@/i18n/i18n";

declare module '*.astro' {
    const Component: (opts?: { slots?: Record<string, string> }) => string;
    export default Component;

    interface AstroSharedContext {
        currentLocale: Locale;
    }
    interface APIContext {
        currentLocale: Locale;
    }
}

declare module "astro" {
    namespace Astro {
        interface AstroSharedContext {
            currentLocale: Locale;
        }
        interface APIContext {
            currentLocale: Locale;
        }
    }
    interface AstroSharedContext {
        currentLocale: Locale;
    }
    interface APIContext {
        currentLocale: Locale;
    }
}

declare namespace Astro {
    interface AstroSharedContext {
        currentLocale: Locale;
    }
    interface APIContext {
        currentLocale: Locale;
    }
}

declare interface AstroSharedContext {
    currentLocale: Locale;
}
declare interface APIContext {
    currentLocale: Locale;
}