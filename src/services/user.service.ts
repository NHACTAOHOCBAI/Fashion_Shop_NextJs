import axiosInstance from "@/config/axios"
import { Role } from "@/constants/role.enum"

const getUsers = async (params: QueryParams) => {
    const response = await axiosInstance.get('/users', { params }) as GetAllResponse<User>
    return response.data
}
const deleteUser = async ({ id }: { id: number }) => {
    const response = await axiosInstance.delete(`/users/${id}`)
    return response
}
const createUser = async (data: { fullName: string, email: string, password: string, role: Role }) => {
    const response = await axiosInstance.post('/users', data)
    return response
}
const updateUser = async ({ id, data }: { id: number, data: { fullName: string, email: string, role: Role } }) => {
    const response = await axiosInstance.patch(`/users/${id}`, data)
    return response
}
export { getUsers, deleteUser, createUser, updateUser }