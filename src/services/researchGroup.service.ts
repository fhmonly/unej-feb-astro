import { http } from "@/lib/http";

type ResearchGroup = {
    id: number,
    nama: string,
    deskripsi: string,
    ketua: string,
    kontak: string,
    links: string
}

export const researchGroupService = {
    async getResearchGroups() {
        try {
            return await http.get<ResearchGroup[]>("/kelompok-research");
        } catch (error) {
            return null;
        }
    },
    async getResearchGroupById(id: number) {
        try {
            return await http.get<ResearchGroup>(`/kelompok-research/${id}`);
        } catch (error) {
            return null;
        }
    }
}