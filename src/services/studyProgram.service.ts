import { http } from "@/lib/http";

type Leader = {
    id: number;
    nama: string;
    gelar_depan: string;
    gelar_belakang: string;
}

type StudyProgram = {
    id: number;
    nama: string;
    gelar: string;
    akreditasi: string;
    kepala_program: Leader;
    deskripsi: string;
    aktif: boolean;
    visi_misi: string;
}

export const studyProgramService = {
    async getStudyProgramById(id: number) {
        try {
            return await http.get<StudyProgram>(`/prodi/${id}`)
        } catch (error) {
            return null;
        }
    },
}