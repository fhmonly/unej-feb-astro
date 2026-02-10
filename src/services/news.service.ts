import { http } from "@/lib/http";
import type { PaginatedResponse } from "@/types/response";

export interface Kategori {
    id: number;
    nama: string;
}

export interface KepalaProgram {
    id: number;
    nama: string;
    gelar_depan: string;
    gelar_belakang: string;
}

export interface Prodi {
    id: number;
    nama: string;
    gelar: 'D3' | 'S1' | 'S2' | 'S3';
    akreditasi: string;
    kepala_program: KepalaProgram;
    deskripsi: string;
    aktif: boolean;
    visi_misi: string;
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

export interface ArtikelDetail {
    id: number;
    judul: string;
    slug: string;
    konten: string;
    kutipan: string;
    kategori: Kategori;
    gambar_unggulan: string;
    prodi: Prodi;
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
    getNewsDetail: async (id?: string) => {
        try {
            if (!id) return null
            return await http.get<ArtikelDetail>(`/berita/${id}`);
        } catch (error) {
            return null
        }
    },
};