import { FastAverageColor } from "fast-average-color";

type BgMode = "auto" | "fixed" | "none";

class AutoBGColor extends HTMLImageElement {
    private fac = new FastAverageColor();

    #bgMode: BgMode = "none";
    #bgColor: string | null = null;

    get fallbackImg() {
        const h = this.getAttribute("height") || 100
        const w = this.getAttribute("width") || 100
        return `https://placehold.co/${w}x${h}`
    }

    static get observedAttributes() {
        return ["data-bgmode", "data-bgcolor"];
    }

    constructor() {
        super();
        this.onLoad = this.onLoad.bind(this);
        this.onError = this.onError.bind(this);
    }

    // ---------- lifecycle ----------

    connectedCallback() {
        this.syncAttrs();

        this.addEventListener("load", this.onLoad);
        this.addEventListener("error", this.onError);

        if (this.complete && this.naturalWidth > 0) {
            this.applyBg();
        } else {
            this.src = this.fallbackImg
        }
    }

    disconnectedCallback() {
        this.removeEventListener("load", this.onLoad);
        this.removeEventListener("error", this.onError);
        this.fac.destroy();
    }

    attributeChangedCallback() {
        this.syncAttrs();
        this.applyBg(); // REACTIVE
    }

    // ---------- attribute sync ----------

    private syncAttrs() {
        const mode = this.getAttribute("data-bgmode") as BgMode | null;
        this.#bgMode = mode || "none";

        this.#bgColor = this.getAttribute("data-bgcolor") || "none";
    }

    // ---------- event handlers ----------

    private onLoad() {
        this.applyBg();
    }

    private onError() {
        if (this.src !== this.fallbackImg) {
            this.src = this.fallbackImg;
        }
    }

    // ---------- main logic ----------

    private applyBg() {
        if (this.#bgMode === "none") return

        if (this.#bgMode === "fixed") {
            this.applyFixedBg();
            return;
        }

        this.applyAutoBg();
    }

    private applyFixedBg() {
        if (!this.#bgColor) return;
        this.style.backgroundColor = this.#bgColor;
    }

    private async applyAutoBg() {
        try {
            const img = await this.loadImage(this.src);
            this.setColorFromImage(img);
        } catch {
            try {
                const img = await this.loadImage(this.src, true);
                this.setColorFromImage(img);
            } catch {
                // silent fail
            }
        }
    }

    // ---------- helpers ----------

    private resolveImageUrl(url: string, useProxy: boolean): string {
        return useProxy
            ? `https://images.weserv.nl/?url=${encodeURIComponent(url)}`
            : url;
    }

    private loadImage(url: string, useProxy = false): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.src = this.resolveImageUrl(url, useProxy);
            img.onload = () => resolve(img);
            img.onerror = reject;
        });
    }

    private setColorFromImage(img: HTMLImageElement) {
        const { rgba } = this.fac.getColor(img);
        this.style.backgroundColor = rgba;
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