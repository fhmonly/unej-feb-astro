import { http } from "@/lib/http";
import type { PaginatedResponse } from "@/types/response";

export interface Kategori {
    id: number;
    nama: string;
}
export interface Prodi {
    id: number;
    nama: string;
    gelar: 'D3' | 'S1' | 'S2' | 'S3'; // bisa diperluas
}

export interface Artikel {
    id: number;
    judul: string;
    slug: string;
    kutipan: string;
    kategori: Kategori;
    konten: string;
    prodi: Prodi;
    gambar_unggulan: string;
    hightlight: boolean;
    tanggal: string; // ISO string
}

export type NewsListResponse = PaginatedResponse<Artikel>;

export const newsService = {
    getNews: async ({
        page = 1,
    }: {
        page?: number
    }) => {
        try {
            if (page < 1) page = 1;
            const param = new URLSearchParams();
            param.set('page', page.toString());
            return await http.get<NewsListResponse>(`/berita?${param.toString()}`);
        } catch (error) {
            return null
        }
    },
};