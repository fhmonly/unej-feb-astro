import { FastAverageColor } from "fast-average-color";

class AutoBGColor extends HTMLImageElement {
    private fac: FastAverageColor;

    constructor() {
        super();
        this.fac = new FastAverageColor();
        this.applyColor = this.applyColor.bind(this);
    }

    connectedCallback(): void {
        if (this.complete && this.naturalWidth > 0) {
            this.applyColor();
        } else {
            this.addEventListener("load", this.applyColor);
        }
    }

    disconnectedCallback(): void {
        this.removeEventListener("load", this.applyColor);
        this.fac.destroy();
    }

    // ---------- helpers ----------

    private resolveImageUrl(url: string, useProxy: boolean): string {
        return useProxy
            ? `https://images.weserv.nl/?url=${encodeURIComponent(url)}`
            : url;
    }

    private loadImage(
        url: string,
        useProxy = false
    ): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = this.resolveImageUrl(url, useProxy);

            img.onload = () => resolve(img);
            img.onerror = () => reject();
        });
    }

    private setColorFromImage(img: HTMLImageElement): void {
        const { rgba } = this.fac.getColor(img);
        this.style.backgroundColor = rgba;
    }

    // ---------- main ----------

    private async applyColor(): Promise<void> {
        try {
            const img = await this.loadImage(this.src);
            this.setColorFromImage(img);
        } catch {
            try {
                const img = await this.loadImage(this.src, true);
                this.setColorFromImage(img);
            } catch {
                // silently fail (CORS / invalid image)
            }
        }
    }
}


(() => {
    // ---------- register ----------
    if (!customElements.get("auto-bg-color")) {
        customElements.define("auto-bg-color", AutoBGColor, {
            extends: "img",
        });
    }
})()