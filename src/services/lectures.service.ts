import { http } from "@/lib/http";

export type TGelarProdi = 'D3' | 'D4' | 'S1' | 'S2' | 'S3'; // opsional, sesuaikan jika enum fix

export interface IProdi {
    id: number;
    nama: string;
    gelar: TGelarProdi;
}

export interface IDosen {
    id: number;
    nama: string;
    gelar_depan: string;
    gelar_belakang: string;
    nip: string;
    prodi: IProdi;
    foto: string;
    email: string;
    jabatan: string;
}

export const lecturesService = {
    async getLectures() {
        try {
            return await http.get<IDosen[]>("/dosen")
        } catch (error) {
            return null;
        }
    },
};