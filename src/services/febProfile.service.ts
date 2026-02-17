import { http } from "@/lib/http";

type FebProfile = {
    deskripsi: string;
    sejarah: string;
    visi_misi: string;
    tujuan: string;
    alamat: string;
    email: string;
    telepon: string;
    dekan: null;
    wakil_dekan_1: null;
    wakil_dekan_2: null;
    wakil_dekan_3: null;
    ktu: null;
    wakor_akademik: null;
    wakor_umum: null;
    wakor_kepegkeu: null;
    terakhir_diupdate: string;
}


export const febProfileService = {
    async getProfile() {
        try {
            const profile = await http.get<FebProfile>("/profil", {
                transformResponse: (data) => {
                    const parsedData = JSON.parse(data)
                    return parsedData[0]
                },
            })
            return profile;
        } catch (error) {
            return null;
        }
    },
}