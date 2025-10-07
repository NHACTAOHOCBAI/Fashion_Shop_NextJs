import axiosInstance from "@/config/axios"

const placeOrder = async (data: { addressId: number, note?: string, items: { variantId: number, quantity: number } }) => {
    const response = await axiosInstance.post('/orders', data)
    return response.data
}
export { placeOrder }