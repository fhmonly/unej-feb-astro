
export function refineYouTubeUrl(input: string): string | null {
    const ytUrl = "https://www.youtube.com/watch?v=";
    try {
        const u = new URL(input.trim());

        // 1. https://www.youtube.com/watch?v=ID
        if (u.hostname.includes("youtube.com")) {
            const v = u.searchParams.get("v");
            if (v) return `${ytUrl}${v}`;
        }

        // 2. https://youtu.be/ID
        if (u.hostname === "youtu.be") {
            const id = u.pathname.replace("/", "");
            if (id) return `${ytUrl}${id}`;
        }

        // 3. https://www.youtube.com/embed/ID
        if (u.pathname.startsWith("/embed/")) {
            const id = u.pathname.split("/")[2];
            if (id) return `${ytUrl}${id}`;
        }

        return null;
    } catch {
        return null;
    }
}
