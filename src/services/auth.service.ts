import axiosInstance from "@/config/axios"

const login = async (data: { email: string, password: string }) => {
    const response = await axiosInstance.post('/auth/login', data)
    return response.data as { user: User }
}
const logout = async () => {
    console.log('log out')
}
const getMyProfile = async () => {
    const response = await axiosInstance.get('/auth/me')
    return response.data as User
}
const updateMyProfile = async (data: { fullName: string, image?: File }) => {
    const formData = new FormData();

    formData.append("fullName", data.fullName);
    if (data.image) formData.append("image", data.image);
    console.log(data.image);
}
export { login, getMyProfile, updateMyProfile, logout }