import axiosInstance from "@/config/axios"

const getUsers = async (params: QueryParams) => {
    const data = await axiosInstance.get('/users', { params }) as GetAllResponse<User>
    return data.data
}
const deleteUser = async ({ id }: { id: number }) => {
    const data = await axiosInstance.delete(`/users/${id}`)
    return data
}
export { getUsers, deleteUser }