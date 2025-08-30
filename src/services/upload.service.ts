import axiosInstance from "@/config/axios"

const uploadImage = async (data: { image: File }) => {
    const formData = new FormData();
    formData.append('file', data.image);
    const response = await axiosInstance.post('/upload', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data
}
export { uploadImage }