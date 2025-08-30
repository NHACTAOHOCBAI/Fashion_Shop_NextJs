import axiosInstance from "@/config/axios"
import { Role } from "@/constants/role.enum"

const getUsers = async (params: QueryParams) => {
    const data = await axiosInstance.get('/users', { params }) as GetAllResponse<User>
    return data.data
}
const deleteUser = async ({ id }: { id: number }) => {
    const data = await axiosInstance.delete(`/users/${id}`)
    return data
}
const createUser = async (input: { fullName: string, email: string, password: string, role: Role }) => {
    const data = await axiosInstance.post('/users', input)
    console.log(data)
    return data
}
export { getUsers, deleteUser, createUser }