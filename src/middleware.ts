import { defineMiddleware } from "astro/middleware";

const DEFAULT_LOCALE = "en";
const LOCALES = ["en", "id"];
const LOCALE_REGEX = new RegExp(`^/(${LOCALES.join("|")})(/|$)`);

function isAsset(pathname: string) {
    return pathname.startsWith("/_astro") || pathname.includes(".");
}

function hasLocale(pathname: string) {
    return LOCALE_REGEX.test(pathname);
}

export const onRequest = defineMiddleware(({ url, request }, next) => {
    const { pathname } = url;

    if (isAsset(pathname)) return next();

    if (hasLocale(pathname)) return next();

    const newUrl = new URL(`/${DEFAULT_LOCALE}${pathname}`, request.url);

    return next(new Request(newUrl, {
        headers: {
            "x-redirect-to": pathname,
        },
    }))
});
