import axiosInstance from "@/config/axios"

const getMyWishlists = async () => {
    const response = await axiosInstance.get('/wishlists')
    return response.data as Wishlist
}
const toggleWishlistItem = async ({ productId }: { productId: number }) => {
    const response = await axiosInstance.post('/wishlists/toggle', { productId })
    return response.data as Wishlist
}
export { getMyWishlists, toggleWishlistItem }