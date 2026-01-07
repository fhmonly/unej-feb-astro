
export type Locale = "en" | "id"

interface languages {
    code: Locale;
    name: string;
}

export const languages: languages[] = [
    { code: "en", name: "English(USA)" },
    { code: "id", name: "Indonesia" },
]

function extractCodesFromLanguages(): Locale[] {
    return languages.map((language) => language.code);
}

export const LOCALES = extractCodesFromLanguages()
export const DEFAULT_LOCALE = "en"


export function getLocaleLink(locale: string, link: string): string {
    if (link.startsWith('http')) return link
    if (link.startsWith('/')) return `/${locale}${link}`
    return '/' + DEFAULT_LOCALE + '/' + link
}

export function generateMultiLocaleStaticPaths<
    T extends Record<string, string>
>(items: T[] = []) {
    return items.length
        ? items.flatMap(item =>
            LOCALES.map(lang => ({
                params: { lang, ...item }
            }))
        )
        : LOCALES.map(lang => ({
            params: { lang }
        }))
}

export async function getStaticPaths<
    T extends Record<string, string>
>(items: T[] = []) {
    return items.length
        ? items.flatMap(item =>
            LOCALES.map(lang => ({
                params: { lang, ...item }
            }))
        )
        : LOCALES.map(lang => ({
            params: { lang }
        }))
}


export function switchLocalePath(
    currentPath: string,
    targetLocale: Locale
): string {
    // external link → return as-is
    if (currentPath.startsWith('http')) return currentPath

    const segments = currentPath.split('/').filter(Boolean)

    // remove existing locale segment if present
    if (LOCALES.includes(segments[0] as Locale)) {
        segments.shift()
    }

    // default locale without prefix (optional behavior)
    // if (targetLocale === DEFAULT_LOCALE) {
    //     return '/' + segments.join('/')
    // }

    return '/' + [targetLocale, ...segments].join('/')
}

type AstroLike = {
    currentLocale?: string;
};
export function getLocale(Astro: AstroLike): Locale {
    return (Astro.currentLocale as Locale) ?? DEFAULT_LOCALE;
}

type I18nDict<T> = Record<Locale, T>;

export function useI18n<T extends Record<string, any>>(
    dict: I18nDict<T>,
    locale: Locale
): T {
    return dict[locale];
}
