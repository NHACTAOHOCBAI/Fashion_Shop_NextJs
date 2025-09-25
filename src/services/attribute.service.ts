/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/config/axios"

const getAttributes = async (params: QueryParams) => {
    const response = await axiosInstance.get('/attributes', { params }) as GetAllResponse<Attribute>
    return response.data
}
const getAttributeSelection = async () => {
    const response = await axiosInstance.get('/attributes') as GetAllResponse<Attribute>
    return response.data.data
}
const deleteAttribute = async ({ id }: { id: number }) => {
    const response = await axiosInstance.delete(`/attributes/${id}`)
    return response
}
const deleteAttributes = async (ids: { ids: number[] }) => {
    const response = await axiosInstance.post('/attributes/remove-multiple', ids)
    return response
}
const createAttribute = async (data: {
    name: string,
}) => {
    const response = await axiosInstance.post('/attributes', data)
    return response
};

const updateAttribute = async ({ id, data }: { id: number, data: { name: string } }) => {
    const response = await axiosInstance.put(`/attributes/${id}`, data)
    return response
}

export const getAttributeCategoryByCategory = async (id: number) => {
    const response = await axiosInstance.get(`/attributes/${id}`)
    console.log(response)
    return response.data as AttributeCategory[]
};
export { createAttribute, deleteAttribute, deleteAttributes, getAttributes, updateAttribute, getAttributeSelection }