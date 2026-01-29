export interface NewsItem {
    id: number;
    judul: string;
    slug: string;
    kutipan: string;
    kategori: {
        id: number;
        nama: string;
    };
    prodi: {
        "id": number,
        "nama": string,
        "gelar": string
    };
    gambar_unggulan: string | null;
    hightlight: boolean;
    tanggal: string | null; // ISO date atau null
}
export interface PaginatedResponse<T> {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[];
}