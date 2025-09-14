import axiosInstance from "@/config/axios"

const getBrands = async (params: QueryParams) => {
    const response = await axiosInstance.get('/brands', { params }) as GetAllResponse<Brand>
    return response.data
}
const getBrandSelection = async () => {
    const response = await axiosInstance.get('/brands') as GetAllResponse<Brand>
    return response.data.data
}
const deleteBrand = async ({ id }: { id: number }) => {
    const response = await axiosInstance.delete(`/brands/${id}`)
    return response
}
const deleteBrands = async (ids: { ids: number[] }) => {
    const response = await axiosInstance.post('/brands/remove-multiple', ids)
    return response
}
const createBrand = async (data: {
    name: string,
    image: File,
    description?: string,
}) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.description) formData.append("description", data.description)
    formData.append("file", data.image);
    const response = await axiosInstance.post('/brands', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return response;
};

const updateBrand = async ({ id, data }: { id: number, data: { name: string, image: File, description?: string } }) => {
    const formData = new FormData();
    formData.append("name", data.name);
    if (data.description) formData.append("description", data.description)
    formData.append("file", data.image);
    const response = await axiosInstance.patch(`/brands/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return response;
}
export { createBrand, deleteBrand, deleteBrands, getBrands, updateBrand, getBrandSelection }