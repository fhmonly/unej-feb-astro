import { http } from "@/lib/http";

type Journal = {
    id: number,
    nama: string,
    deskripsi: string,
    issn: string,
    links: string
}

export const journalService = {
    getJournals: async () => {
        try {
            return await http.get<Journal[]>("/jurnal");
        } catch (error) {
            return null;
        }
    },
    getJournalById: async (id: number) => {
        try {
            return await http.get<Journal>(`/jurnal/${id}`);
        } catch (error) {
            return null;
        }
    }
}