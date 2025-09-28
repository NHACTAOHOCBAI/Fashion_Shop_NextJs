import axiosInstance from "@/config/axios"

const getMyCart = async () => {
    const response = await axiosInstance.get('/carts/me')
    return response.data as Cart
}
const addToCart = async (data: {
    quantity: number,
    variantId: number
}) => {
    const response = await axiosInstance.post('/carts/add', data)
    return response
}
const removeFromCart = async (data: {
    quantity: number,
    variantId: number
}) => {
    const response = await axiosInstance.post('/carts/remove', data)
    return response
}
export { getMyCart, addToCart, removeFromCart }