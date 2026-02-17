import { DEFAULT_LOCALE, useI18n, type Locale } from "@/i18n/i18n";
import Swal from "sweetalert2";

export type StaffData = {
    id: string;
    nama: string;
    nama_gelar: string;
    nomor_pegawai: string;
    nidn: string;
    nuptk: string;
    email: string;
    bidang_ilmu: string;
    jenis_kelamin: string;
    homebase_fakultas: string;
    homebase_prodi: string;
    status_pegawai: string;
    jabatan_fungsional: string;
    status_kerja: string;
    penugasan_fakultas: string;
    penugasan_prodi: string;
    pangkat_golongan: string;
    pendidikan: string;
};

function fillStaffTemplate(templateHtml: string, data: StaffData): string {
    let result = templateHtml;
    const keysInTemplate = [...result.matchAll(/\[\[(.*?)\]\]/g)].map(m => m[1])
    // cari value dari data sumber
    keysInTemplate.forEach((v) => {
        let key = v
        const keyHasDefaultValue = key.includes("=")
        let keyDefaultValue = "-"

        if (keyHasDefaultValue) {
            [key, keyDefaultValue] = key.split("=")
        }

        const hasValueFromData = Object.keys(data).includes(key)
        const value = hasValueFromData ? data[key as keyof StaffData] || keyDefaultValue : keyDefaultValue

        result = result.replaceAll(`[[${v}]]`, value)
    })

    return result;
}

class DetailButton extends HTMLElement {
    constructor() {
        super();
        const detailDs = this.dataset.detail;
        this.role = "button"
        this.removeAttribute("data-detail");
        const detailJson = detailDs ? JSON.parse(detailDs) : null;
        const detail: StaffData | null = detailJson ? detailJson : null;

        if (detail) {
            const modalTemplateDs = this.dataset.template
                ? this.dataset.template
                : "modal-template";

            const modalTemplate =
                document.body.querySelector<HTMLTemplateElement>(modalTemplateDs);
            const modalTemplateHtml = modalTemplate?.innerHTML;
            const modalTemplateHtmlFinal = modalTemplateHtml
                ? fillStaffTemplate(
                    modalTemplateHtml,
                    detail // bertipe StaffData
                )
                : null;

            if (modalTemplateHtmlFinal) {
                const html = document.querySelector("html")
                const locale = (html?.lang || DEFAULT_LOCALE) as Locale
                const words = useI18n({
                    en: {
                        close: "Close",
                    },
                    id: {
                        close: "Tutup",
                    }
                }, locale);
                const closeBtnText = words.close
                this.addEventListener("click", () => {
                    Swal.fire({
                        html: modalTemplateHtmlFinal,
                        confirmButtonColor: "#C40C0C",
                        confirmButtonText: closeBtnText,
                    });
                });
            }
        }
    }
}


(() => {
    // ---------- register ----------
    if (!customElements.get("detail-button")) {
        customElements.define("detail-button", DetailButton);
    }
})()