import axiosInstance from "@/config/axios"

const placeOrder = async (data: { addressId: number, note?: string, items: { variantId: number, quantity: number }[] }) => {
    const response = await axiosInstance.post('/orders', data)
    return response.data
}
const getMyOrders = async (params: QueryParams) => {
    const response = await axiosInstance.get('/orders/me', { params }) as GetAllResponse<Order>
    return response.data
}
const getMyOrderById = async (id: number) => {
    const response = await axiosInstance.get(`/orders/me/${id}`) as { data: Order }
    return response.data
}
export { placeOrder, getMyOrders, getMyOrderById }