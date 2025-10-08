import axiosInstance from "@/config/axios"

const getMyAddress = async () => {
    const response = await axiosInstance.get('/address')
    return response.data as Address[]
}
const createAddress = async (data: {
    recipientName: string;
    recipientPhone: string;
    province: string;
    district: string;
    commune: string;
    type: 'home' | 'office'
    isDefault: boolean;
}) => {
    const response = await axiosInstance.post('/address', data)
    return response;
}
const updateAddress = async ({ id, data }: {
    id: number,
    data: {
        recipientName: string;
        recipientPhone: string;
        province: string;
        district: string;
        commune: string;
        type: 'home' | 'office'
        isDefault: boolean;
    }
}) => {
    const response = await axiosInstance.patch(`/address/${id}`, data)
    return response;
}
const deleteAddress = async ({ id }: { id: number }) => {
    const response = await axiosInstance.delete(`/address/${id}`)
    return response
}
export { getMyAddress, createAddress, deleteAddress, updateAddress }