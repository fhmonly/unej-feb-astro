import { http } from "@/lib/http";

type TeachingStaff = {
    id: number;
    nama: string;
    gelar_depan: string;
    gelar_belakang: string;
    nip: string;
    foto: string;
    email: string;
    jabatan: string;
}


export const teachingStaffService = {
    async getStaff() {
        try {
            return await http.get<TeachingStaff[]>("/tendik")
        } catch (error) {
            return null;
        }
    },
    async getStaffDetail(id?: string) {
        try {
            if (!id) return null
            return await http.get<TeachingStaff>(`/tendik/${id}`);
        } catch (error) {
            return null
        }
    }
};