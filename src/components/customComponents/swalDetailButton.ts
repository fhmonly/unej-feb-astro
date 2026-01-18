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

    // iterate hanya key yang ada pada StaffData
    (Object.keys(data) as (keyof StaffData)[]).forEach((key) => {
        const token = `[${key}]`;
        const value = String(data[key] ?? "").trim();
        if (value) {
            result = result.replaceAll(token, value);
        }
    });

    result = result.replace(/\[[^\]]+\]/g, "-");
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
                this.addEventListener("click", () => {
                    Swal.fire({
                        html: modalTemplateHtmlFinal,
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