import axiosInstance from "@/config/axios"

const login = async (data: { email: string, password: string }) => {
    const response = await axiosInstance.post('/auth/login', data)
    return response
}
export { login }