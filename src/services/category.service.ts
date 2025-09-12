import axiosInstance from "@/config/axios"

const getCategories = async (params: QueryParams) => {
    const response = await axiosInstance.get('/categories', { params }) as GetAllResponse<Category>
    return response.data
}
const deleteCategory = async ({ id }: { id: number }) => {
    const response = await axiosInstance.delete(`/categories/${id}`)
    return response
}
const deleteCategories = async (ids: { ids: number[] }) => {
    const response = await axiosInstance.post('/categories/remove-mutiple', ids)
    return response
}
const createCategory = async (data: { name: string, image?: File, parentId?: number | null, description?: string, }) => {
    console.log(data)
}
const updateCategory = async ({ id, data }: { id: number, data: { name: string, image?: File, parentId?: number | null, description?: string, } }) => {
    console.log(data)
}
export { createCategory, deleteCategories, deleteCategory, getCategories, updateCategory }