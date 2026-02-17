import { http } from "@/lib/http";

type StudentOrganization = {
    id: number,
    nama: string,
    deskripsi: string,
    logo: string,
    kontak: string,
    links: string
}

export const studentOrganizationService = {
    async getStudentOrganization() {
        try {
            return await http.get<StudentOrganization[]>("/organisasi-mahasiswa")
        } catch (error) {
            return null;
        }
    },
    async getStudentOrganizationById(id: number) {
        try {
            return await http.get<StudentOrganization>(`/organisasi-mahasiswa/${id}`)
        } catch (error) {
            return null;
        }
    }
}