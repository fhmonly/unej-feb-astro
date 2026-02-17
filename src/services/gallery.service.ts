import { http } from "@/lib/http";

type Gallery = {
    id: number,
    judul: string,
    jenis: "Foto" | "Video",
    file: string,
    deskripsi: string,
    tanggal: string
}

export const galleryService = {
    async getGallery() {
        try {
            return await http.get<Gallery[]>("/galeri");
        } catch (error) {
            return null;
        }
    },
    async getPhotoGallery() {
        try {
            const gallery = await http.get<Gallery[]>("/galeri")
            gallery.data = gallery.data.filter(item => item.jenis === "Foto")
            return gallery;
        } catch (error) {
            return null;
        }
    },
    async getVideoGallery() {
        try {
            const gallery = await http.get<Gallery[]>("/galeri")
            gallery.data = gallery.data.filter(item => item.jenis === "Video")
            return gallery;
        } catch (error) {
            return null;
        }
    },
    async getGalleryById(id: number) {
        try {
            return await http.get<Gallery>(`/galeri/${id}`);
        } catch (error) {
            return null;
        }
    },
}