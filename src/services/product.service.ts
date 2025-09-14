import axiosInstance from "@/config/axios"

const getProducts = async (params: QueryParams) => {
    const response = await axiosInstance.get('/products', { params }) as GetAllResponse<Product>
    return response.data
}
const createProduct = async (data: {
    name: string,
    description?: string,
    price: number,
    categoryId: number,
    brandId: number,
    images: File[],
    variantImages?: File[],
    variants: {
        size: string,
        color: string,
        quantity: number;
        price: number
    }
}) => {
    console.log(data)
    return data
};
const updateProduct = async ({ id, data }: {
    id: number, data: {
        name: string,
        description?: string,
        price: number,
        categoryId: number,
        brandId: number,
        images: File[],
        variantImages?: File[],
        variants: {
            size: string,
            color: string,
            quantity: number;
            price: number
        }
    }
}) => {
    console.log(data)
    return data
}
const deleteProduct = async ({ id }: { id: number }) => {
    const response = await axiosInstance.delete(`/products/${id}`)
    return response
}
const deleteProducts = async (ids: { ids: number[] }) => {
    const response = await axiosInstance.post('/products/remove-multiple', ids)
    return response
}
export { getProducts, createProduct, deleteProduct, deleteProducts, updateProduct }