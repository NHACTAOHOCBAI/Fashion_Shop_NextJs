import axiosInstance from "@/config/axios"

const getCategories = async (params: QueryParams) => {
    const response = await axiosInstance.get('/categories', { params }) as GetAllResponse<Category>
    return response.data
}
const getCategorySelection = async () => {
    const response = await axiosInstance.get('/categories') as GetAllResponse<Category>
    return response.data.data
}
const deleteCategory = async ({ id }: { id: number }) => {
    const response = await axiosInstance.delete(`/categories/${id}`)
    return response
}
const deleteCategories = async (ids: { ids: number[] }) => {
    const response = await axiosInstance.post('/categories/remove-multiple', ids)
    return response
}
const createCategory = async (data: {
    name: string,
    image?: File,
    parentId?: number,
    description?: string,
}) => {
    const formData = new FormData();

    formData.append("name", data.name);
    if (data.parentId) formData.append("parentId", data.parentId.toString())
    if (data.description) formData.append("description", data.description)
    if (data.image) formData.append("file", data.image);
    const response = await axiosInstance.post('/categories', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return response;
};

const updateCategory = async ({ id, data }: { id: number, data: { name: string, image?: File, parentId?: number | null, description?: string, } }) => {
    const formData = new FormData();

    formData.append("name", data.name);
    if (data.parentId) formData.append("parentId", data.parentId.toString())
    if (data.description) formData.append("description", data.description)
    if (data.image) formData.append("file", data.image);
    const response = await axiosInstance.patch(`/categories/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    return response;
}
export { createCategory, deleteCategories, deleteCategory, getCategories, updateCategory, getCategorySelection }