import axiosInstance from "@/config/axios"
import { Role } from "@/constants/role.enum"
import { uploadImage } from "@/services/upload.service"

const getUsers = async (params: QueryParams) => {
    const response = await axiosInstance.get('/users', { params }) as GetAllResponse<User>
    return response.data
}
const deleteUser = async ({ id }: { id: number }) => {
    const response = await axiosInstance.delete(`/users/${id}`)
    return response
}
const createUser = async (data: { fullName: string, email: string, password: string, role: Role, image?: File }) => {
    let imageUrl = undefined
    if (data.image)
        imageUrl = (await uploadImage({ image: data.image })).secure_url
    const temp = {
        fullName: data.fullName,
        email: data.email,
        password: data.password,
        role: data.role,
        ...(imageUrl && { avatar: imageUrl })
    }
    const response = await axiosInstance.post('/users', temp)
    return response
}
const updateUser = async ({ id, data }: { id: number, data: { fullName: string, email: string, role: Role, image?: File } }) => {
    let imageUrl = undefined
    if (data.image)
        imageUrl = (await uploadImage({ image: data.image })).secure_url
    const temp = {
        fullName: data.fullName,
        email: data.email,
        role: data.role,
        ...(imageUrl && { avatar: imageUrl })
    }
    const response = await axiosInstance.patch(`/users/${id}`, temp)
    return response
}
export { getUsers, deleteUser, createUser, updateUser }